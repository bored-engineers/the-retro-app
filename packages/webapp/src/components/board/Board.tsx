import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { Grid, Typography, Button, Box, ButtonGroup, Popper, Paper, ClickAwayListener } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GoodMoodIcon from '@material-ui/icons/Mood';
import BadMoodIcon from '@material-ui/icons/MoodBad';
import ActionItemIcon from '@material-ui/icons/PlaylistAddCheck';
import AppreciationIcon from '@material-ui/icons/Stars';
import AddIcon from '@material-ui/icons/AddCircle';
import { TAction, TState } from '../../store/interfaces';
import * as ActionTypes from '../../store/actions';
import Navbar from '../common/navbar/Navbar';
import NoteForm from './note-form/NoteForm';
import Note from './note/Note';
import IconButton from '@material-ui/core/IconButton';
import SafetyCheck from './safety-check/SafetyCheck';
import SafetyChart from './safety-chart/SafetyChart';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import './Board.scss';
import { getUserIDStorageKey } from '../../common-utils';

type NoteType = { category: string, text: string, boardId: string, cardId: string, votes: string[] };
type TBoardStateProps = { userId: string; boardId: string; safetyScores: number[] }
type TBoardDispatchProps = { setSafetyScores: Function, setBoardId: Function, setUserId: Function };
type TBoardProps = TBoardStateProps & TBoardDispatchProps & { location: Location };

let socket: SocketIOClient.Socket;

const isEmpty = (data: any) => Object.keys(data).length === 0;


const Boards = ({ userId, boardId, safetyScores, setBoardId, setUserId, setSafetyScores, location }: TBoardProps) => {
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';
    const [noteForm, setNoteForm] = useState({ open: false, data: {}, createNoteHandler: {} });
    const [safetyCheck, setSafetyCheck] = useState({ open: false });

    const [isSafe, setIsSafe] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const onSafetyResultClickHandler = (event: any) => {
        event.stopPropagation()
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const onSafetyCheckClickAway = (event: any) => {
        setAnchorEl(null);
    }

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

    const getBoardIdFromUrl = (url: string) => {
        const { boardId } = url.match(/(\/boards\/(?<boardId>[\w\d-]*))/)?.groups || { boardId: '' };
        if (Boolean(boardId)) return boardId;
        else throw new Error('Invalid board id');
    }

    useEffect(() => {
        setIsSafe(safetyScores.every(score => score > 2));
    }, [safetyScores]);

    useEffect(() => {
        const boardIdFromUrl = getBoardIdFromUrl(location.pathname);
        const userIdFromStorage = getUserIdForBoard(boardIdFromUrl);

        if (!boardId) setBoardId(boardIdFromUrl);
        if (!userId) setUserId(userIdFromStorage);

        socket = io(SOCKET_URL, { query: { userId, boardId } });

        socket.on('welcome', (data: { boardId: string, cards: NoteType[], safetyScores: number[] }) => {
            const { cards: notes, safetyScores } = data;
            setBoardData({ 'went-well': [], 'not-well': [], 'action-items': [], 'appreciations': [] })
            setSafetyScores(safetyScores);
            if (!isEmpty(notes)) {
                notes.forEach(note => {
                    setBoardData(boardData => ({ ...boardData, [note.category]: [note, ...(boardData as any)[note.category]] }));
                });
            }
        });

    }, [SOCKET_URL, boardId, location.pathname, setBoardId, setSafetyScores, setUserId, userId]);

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
            setSafetyScores(newSafetyScores);
        });
    }, [setSafetyScores]);

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
    }, []);

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
            <Navbar boardId={boardId} />
            <Box display="flex" borderBottom={1} boxShadow={1} className="toolbar-box">
                <Box display="flex" flexDirection="row">
                    <ButtonGroup color="primary" variant="contained" size="small" aria-label="small outlined button group">
                        <Button onClick={sortCardHandler}>SORT BY VOTES</Button>
                    </ButtonGroup>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="row-reverse">
                    <Button size="small" variant="outlined" className={isSafe ? "safety-success" : "safety-failure"} onClick={onSafetyResultClickHandler}> Safety Result: {isSafe ? 'Safe' : 'False'} <InfoOutlinedIcon className='safety-result-info' /></Button>

                    <Typography className='safety-score-info'></Typography>

                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <ClickAwayListener onClickAway={onSafetyCheckClickAway}>
                            <Paper variant='elevation' elevation={3} className='safety-graph'><SafetyChart data={safetyScores} /></ Paper>
                        </ClickAwayListener>
                    </Popper>
                </Box>
            </Box>
            <div className="board-content">
                <Grid container>
                    {Object.keys(boardData).map((category, index) => (
                        <Grid id={`categoryColumnGrid${index}`} item xs={12} sm={3} key={`categoryColumnGrid${index}`}>
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

const mapStateToProps = (state: TState): TBoardStateProps => {
    return {
        boardId: state.boardId,
        userId: state.userId,
        safetyScores: state.safetyScores
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>): TBoardDispatchProps => {
    return {
        setSafetyScores: (safetyScores: number[]) => dispatch({ type: ActionTypes.SET_SAFETY_SCORES, safetyScores }),
        setBoardId: (boardId: string) => dispatch({ type: ActionTypes.SET_BOARDID, boardId }),
        setUserId: (userId: string) => dispatch({ type: ActionTypes.SET_USERID, userId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
