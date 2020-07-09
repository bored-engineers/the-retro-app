import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GoodMoodIcon from '@material-ui/icons/Mood';
import BadMoodIcon from '@material-ui/icons/MoodBad';
import ActionItemIcon from '@material-ui/icons/PlaylistAddCheck';
import AppreciationIcon from '@material-ui/icons/Stars';
import AddIcon from '@material-ui/icons/AddCircle';
import queryString from 'querystring';
import io from 'socket.io-client'

import Navbar from '../navbar/Navbar';
import BoardInfo from '../board-info/BoardInfo';
import NoteForm from '../note-form/NoteForm';
import Note from '../note/Note';
import './Board.scss';
import IconButton from '@material-ui/core/IconButton';


type NoteType = { category: string, text: string, boardId: string, cardId: string, votes: string[] };
let socket: SocketIOClient.Socket;

const isEmpty = (data: any) => Object.keys(data).length === 0;

const Boards = ({ location }: { location: Location }) => {
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';
    const [boardId, setBoardId] = useState('');
    const [username, setUsername] = useState('');
    const [noteForm, setNoteForm] = useState({
        open: false,
        data: {},
        createNoteHandler: {}
    });

    const CATEGORIES_TITLE_MAP = new Map<string, string>()
        .set('went-well', 'What went well')
        .set('not-well', 'What didn\'t go well')
        .set('action-items', 'Action items')
        .set('appreciations', 'Appreciations');

    const [boardData, setBoardData] = useState({
        'went-well': [],
        'not-well': [],
        'action-items': [],
        'appreciations': []
    });

    const updateNoteHandler = (note: NoteType) => {
        console.log(`Updating a card to ${note.category} with ${note.text}`);
        socket.emit('update-card', note);
    };

    const updateVoteHandler = (note: NoteType) => {
        console.log(`Updating vote to card having ${note.text}`);
        socket.emit('vote-card', note);
    };

    const createNoteHandler = (categoryId: string, text: string) => {
        console.log(`Adding a card to ${categoryId} with ${text}`);

        socket.emit('create-card', { category: categoryId, text: text });
    };

    const ADD_ICON_BUTTON = (categoryId: string) => <span className="add-button"><IconButton color='primary' onClick={(event) => { event.preventDefault(); setNoteForm({ open: true, createNoteHandler: createNoteHandler, data: { category: categoryId, categoryTitle: CATEGORIES_TITLE_MAP.get(categoryId) } }); }}><AddIcon /></IconButton></span>;

    const CATEGORIES_ICON_MAP = new Map<string, object>()
        .set('went-well', <span id="wentWellColumn" className='category-title'><GoodMoodIcon className='heading-well-icon'/><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What went well</Typography>{ADD_ICON_BUTTON('went-well')}</span>)
        .set('not-well', <span id="notWellColumn" className='category-title'><BadMoodIcon color='error' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What didn't go well</Typography>{ADD_ICON_BUTTON('not-well')}</span>)
        .set('action-items', <span id="actionItemsColumn" className='category-title'><ActionItemIcon className='heading-action-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >Action items</Typography>{ADD_ICON_BUTTON('action-items')}</span>)
        .set('appreciations', <span id="appreciationsColumn" className='category-title'><AppreciationIcon className='heading-appreciation-icon'/><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >Appreciations</Typography>{ADD_ICON_BUTTON('appreciations')}</span>);



    useEffect(() => {
        const { '?username': username } = queryString.parse(location.search);

        const { boardId } = location.pathname.match(/(\/boards\/(?<boardId>[\w\d-]*))/)?.groups || { boardId: '' };
        setBoardId(boardId);
        setUsername(username as string);

        socket = io(SOCKET_URL, { query: { userId: username, boardId: boardId } });

        socket.on('welcome', (data: { boardId: string, cards: NoteType[] }) => {
            const { cards: notes } = data;
            if (!isEmpty(notes)) {
                notes.forEach(note => {
                    setBoardData(boardData => ({ ...boardData, [note.category]: [note, ...(boardData as any)[note.category]] }));
                });
            }
        });

    }, [SOCKET_URL, location]);

    useEffect(() => {
        socket.on('add-card', (newNote: NoteType) => {
            console.log('Adding a new card to Board...', newNote);
            setBoardData((boardData: any) => {
                const notesFromCategory = boardData[newNote.category];
                const existingNoteIndex = notesFromCategory.findIndex((note: NoteType) => (note.cardId === newNote.cardId));
                if (existingNoteIndex === -1) {
                    notesFromCategory.push(newNote);
                    return { ...boardData, [newNote.category]: notesFromCategory }
                } else {
                    notesFromCategory[existingNoteIndex] = newNote;
                    return { ...boardData, [newNote.category]: notesFromCategory }
                }
            });
        });
    }, []);


    return (
        <div className="board">
            <Navbar username={username} />
            <BoardInfo boardId={boardId} />
            <div className="board-content">
                <Grid container>
                    {Object.keys(boardData).map((category, index) => (
                        <Grid id={`categoryColumnGrid${index}`} item xs={12} sm={3}>
                            {CATEGORIES_ICON_MAP.get(category)}
                            <Divider variant="middle" />
                            <Grid id={`categoryColumnContentGrid${index}`} container direction="column" justify="space-evenly" alignItems="center" className="category">
                                {(boardData as any)[category].map((note: NoteType, index:number) => (
                                    <Note id={`note${index}`} note={note} setNoteForm={setNoteForm} updateNoteHandler={updateNoteHandler} updateVoteHandler={updateVoteHandler}/>
                                ))}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <NoteForm noteForm={noteForm} setNoteForm={setNoteForm} />
        </div>
    );
}


export default Boards;