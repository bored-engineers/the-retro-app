import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, ButtonGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GoodMoodIcon from '@material-ui/icons/Mood';
import BadMoodIcon from '@material-ui/icons/MoodBad';
import ActionItemIcon from '@material-ui/icons/PlaylistAddCheck';
import AppreciationIcon from '@material-ui/icons/Stars';
import AddIcon from '@material-ui/icons/AddCircle';
import io from 'socket.io-client'
import Navbar from '../navbar/Navbar';
import BoardInfo from '../board-info/BoardInfo';
import NoteForm from '../note-form/NoteForm';
import Note from '../note/Note';
import IconButton from '@material-ui/core/IconButton';
import SafetyCheck from '../safety-check/SafetyCheck';
import { getUserIDStorageKey } from '../../common-utils';

import './Board.scss';


type NoteType = { category: string, text: string, boardId: string, cardId: string, votes: string[] };
let socket: SocketIOClient.Socket;

const isEmpty = (data: any) => Object.keys(data).length === 0;

const Boards = ({ location }: { location: Location }) => {
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';

    const [safetyScores, setSafetyScores] = useState<number[]>([]);
    const [boardId, setBoardId] = useState('');
    const [userId, setUserId] = useState('');
    const [noteForm, setNoteForm] = useState({ open: false, data: {}, createNoteHandler: {} });

    const [safetyCheck, setSafetyCheck] = useState({ open: false });

    const CATEGORIES_TITLE_MAP = new Map<string, string>()
        .set('went-well', 'What went well')
        .set('not-well', 'What didn\'t go well')
        .set('action-items', 'Action items')
        .set('appreciations', 'Appreciations');

    const [boardData, setBoardData] = useState({
        'went-well': [] as any[],
        'not-well': [] as any[],
        'action-items': [] as any[],
        'appreciations': [] as any[]
    });

    const deleteHandler = (cardId: string) => {
        socket.emit('remove-card', cardId);
    };

    const safetyScoreSubmitHandler = (value: Number) => {
        socket.emit('submit-safety-score', value);
    };

    const updateNoteHandler = (note: NoteType) => {
        socket.emit('update-card', note);
    };

    const updateVoteHandler = (note: NoteType) => {
        socket.emit('vote-card', note);
    };

    const createNoteHandler = (categoryId: string, text: string) => {
        socket.emit('create-card', { category: categoryId, text: text });
    };

    const sortCardHandler = () => {
        const currentBoardData = boardData;
        const sortedBoard = Object.keys(currentBoardData).reduce((sortedBoarData, category: string) => {
            const sortedCardsWithinCategory = (currentBoardData as any)[category].sort((card1: any, card2: any) => {
                return card2.votes.length - card1.votes.length;
            });
            return { ...sortedBoarData, [category]: sortedCardsWithinCategory };
        }, {});

        setBoardData(sortedBoard as any);
    };

    const ADD_ICON_BUTTON = (categoryId: string) => <span className="add-button"><IconButton color='primary' onClick={(event) => { event.preventDefault(); setNoteForm({ open: true, createNoteHandler: createNoteHandler, data: { category: categoryId, categoryTitle: CATEGORIES_TITLE_MAP.get(categoryId) } }); }}><AddIcon /></IconButton></span>;

    const CATEGORIES_ICON_MAP = new Map<string, object>()
        .set('went-well', <span id="wentWellColumn" className='category-title'><GoodMoodIcon className='heading-well-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What went well</Typography>{ADD_ICON_BUTTON('went-well')}</span>)
        .set('not-well', <span id="notWellColumn" className='category-title'><BadMoodIcon color='error' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What didn't go well</Typography>{ADD_ICON_BUTTON('not-well')}</span>)
        .set('action-items', <span id="actionItemsColumn" className='category-title'><ActionItemIcon className='heading-action-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >Action items</Typography>{ADD_ICON_BUTTON('action-items')}</span>)
        .set('appreciations', <span id="appreciationsColumn" className='category-title'><AppreciationIcon className='heading-appreciation-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >Appreciations</Typography>{ADD_ICON_BUTTON('appreciations')}</span>);

    const getUserIdForBoard = (boardId: string) => {
        let userId = localStorage.getItem(getUserIDStorageKey(boardId));
        if (Boolean(userId)) return userId;
        else throw new Error('Invalid user id');
    }

    useEffect(() => {
        const { boardId } = location.pathname.match(/(\/boards\/(?<boardId>[\w\d-]*))/)?.groups || { boardId: '' };
        if (!boardId) throw new Error('Invalid board id');
        const userId = getUserIdForBoard(boardId);

        setBoardId(boardId);
        setUserId(userId as string);

        socket = io(SOCKET_URL, { query: { userId: userId, boardId: boardId } });

        socket.on('welcome', (data: { boardId: string, cards: NoteType[], safetyScores: number[] }) => {
            const { cards: notes, safetyScores } = data;
            setBoardData({ 'went-well': [], 'not-well': [], 'action-items': [], 'appreciations': [] })
            setSafetyScores([...safetyScores]);
            if (!isEmpty(notes)) {
                notes.forEach(note => {
                    setBoardData(boardData => ({ ...boardData, [note.category]: [note, ...(boardData as any)[note.category]] }));
                });
            }
        });

    }, [SOCKET_URL, location]);

    useEffect(() => {
        socket.on('add-card', (newNote: NoteType) => {
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

    useEffect(() => {
        socket.on('update-safety-scores', (newSafetyScores: number[]) => {
            setSafetyScores([...newSafetyScores]);
        });
    }, []);

    useEffect(() => {
        socket.on('remove-card', (deletedNote: NoteType) => {
            setBoardData((boardData: any) => {
                const notesFromCategory = boardData[deletedNote.category];
                const existingNoteIndex = notesFromCategory.findIndex((note: NoteType) => (note.cardId === deletedNote.cardId));
                if (existingNoteIndex !== -1) {
                    notesFromCategory.splice(existingNoteIndex, 1);
                }
                return { ...boardData, [deletedNote.category]: notesFromCategory };
            });
        });
    });

    useEffect(() => {
        const SAFETY_CHECK_KEY = 'safty-check' + boardId + userId;
        const item = localStorage.getItem(SAFETY_CHECK_KEY);
        if (!item) {
            setSafetyCheck({ open: true });
            localStorage.setItem(SAFETY_CHECK_KEY, 'done');
        }
    }, [boardId, userId]);

    return (
        <div className="board">
            <Navbar />
            <BoardInfo boardId={boardId} safetyScores={safetyScores} />
            <Box display="flex" borderBottom={1} boxShadow={1} className="toolbar-box" flexDirection="row-reverse">
                <ButtonGroup color="primary" variant="contained" size="small" aria-label="small outlined button group">
                    <Button onClick={sortCardHandler}>SORT BY VOTES</Button>
                </ButtonGroup>
            </Box>
            <div className="board-content">
                <Grid container>
                    {Object.keys(boardData).map((category, index) => (
                        <Grid id={`categoryColumnGrid${index}`} item xs={12} sm={3}>
                            {CATEGORIES_ICON_MAP.get(category)}
                            <Divider variant="middle" />
                            <Grid id={`categoryColumnContentGrid${index}`} container direction="column" justify="space-evenly" alignItems="center" className="category">
                                {(boardData as any)[category].map((note: NoteType, index: number) => (
                                    <Note id={`note${index}`} userId={userId} note={note} setNoteForm={setNoteForm} updateNoteHandler={updateNoteHandler} updateVoteHandler={updateVoteHandler} deleteHandler={deleteHandler} />
                                ))}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <NoteForm noteForm={noteForm} setNoteForm={setNoteForm} />
            <SafetyCheck safetyCheck={safetyCheck} setSafetyCheck={setSafetyCheck} safetyScoreSubmitHandle={safetyScoreSubmitHandler} />
        </div>
    );
}

export default Boards;