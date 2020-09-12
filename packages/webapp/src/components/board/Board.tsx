import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, Typography, Button, Box, ButtonGroup, Popper, Paper, ClickAwayListener } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GoodMoodIcon from '@material-ui/icons/Mood';
import BadMoodIcon from '@material-ui/icons/MoodBad';
import ActionItemIcon from '@material-ui/icons/PlaylistAddCheck';
import AppreciationIcon from '@material-ui/icons/Stars';
import AddIcon from '@material-ui/icons/AddCircle';
import { TAction, TState, ConnectionStatus } from '../../store/interfaces';
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
type TBoardStateProps = { userId: string; boardId: string; safetyScores: number[], connectionStatus: ConnectionStatus, notes: any }
type TBoardDispatchProps = {
    setBoardId: Function, setUserId: Function, socketConnect: Function, createNote: Function, updateSafetyScore: Function,
    removeNote: Function, updateVote: Function, updateNote: Function, sortBoardData: Function
};
type TBoardProps = TBoardStateProps & TBoardDispatchProps & { location: Location };

const Boards = ({
    userId, boardId, safetyScores, setBoardId, setUserId, location, socketConnect, connectionStatus, notes, createNote,
    updateSafetyScore, removeNote, updateVote, updateNote, sortBoardData
}: TBoardProps) => {

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
        .set('wentWell', 'What went well')
        .set('notWell', 'What didn\'t go well')
        .set('actionItems', 'Action items')
        .set('appreciations', 'Appreciations');

    const deleteHandler = (noteId: string) => removeNote(noteId);

    const safetyScoreSubmitHandler = (value: Number) => updateSafetyScore(value);

    const updateNoteHandler = (note: NoteType) => updateNote(note);

    const updateVoteHandler = (note: NoteType) => updateVote(note);

    const createNoteHandler = (categoryId: string, text: string) => createNote(categoryId, text);

    const sortCardHandler = () => sortBoardData();

    const ADD_ICON_BUTTON = (categoryId: string) => <span className="add-button"><IconButton color='primary' onClick={(event) => { event.preventDefault(); setNoteForm({ open: true, createNoteHandler: createNoteHandler, data: { category: categoryId, categoryTitle: CATEGORIES_TITLE_MAP.get(categoryId) } }); }}><AddIcon /></IconButton></span>;

    const CATEGORIES_ICON_MAP = new Map<string, object>()
        .set('wentWell', <span id="wentWellColumn" className='category-title'><GoodMoodIcon className='heading-well-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What went well</Typography>{ADD_ICON_BUTTON('went-well')}</span>)
        .set('notWell', <span id="notWellColumn" className='category-title'><BadMoodIcon color='error' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >What didn't go well</Typography>{ADD_ICON_BUTTON('not-well')}</span>)
        .set('actionItems', <span id="actionItemsColumn" className='category-title'><ActionItemIcon className='heading-action-icon' /><Typography color="textSecondary" variant='subtitle1' className='category-title-text' >Action items</Typography>{ADD_ICON_BUTTON('action-items')}</span>)
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

        socketConnect(userId, boardId);

    }, [boardId, location.pathname, setBoardId, setUserId, userId, socketConnect]);

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
            <Navbar boardId={boardId} connectionStatus={connectionStatus} />
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
                    {Object.keys(notes).map((category, index) => (
                        <Grid id={`categoryColumnGrid${index}`} item xs={12} sm={3} key={`categoryColumnGrid${index}`}>
                            {CATEGORIES_ICON_MAP.get(category)}
                            <Divider variant="middle" />
                            <Grid id={`categoryColumnContentGrid${index}`} container direction="column" justify="space-evenly" alignItems="center" className="category">
                                {(notes as any)[category].map((note: NoteType, index: number) => (
                                    <Note key={`note${index}`} id={`note${index}`} userId={userId} note={note} setNoteForm={setNoteForm} updateNoteHandler={updateNoteHandler} updateVoteHandler={updateVoteHandler} deleteHandler={deleteHandler} />
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
        safetyScores: state.safetyScores,
        connectionStatus: state.connectionStatus,
        notes: state.boardData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>): TBoardDispatchProps => {
    return {
        createNote: (categoryId: string, text: string) => dispatch({ type: ActionTypes.CREATE_NOTE, categoryId, text }),
        removeNote: (noteId: string) => dispatch({ type: ActionTypes.REMOVE_NOTE, noteId }),
        updateNote: (note: NoteType) => dispatch({ type: ActionTypes.UPDATE_NOTE, note }),
        updateVote: (note: NoteType) => dispatch({ type: ActionTypes.UPDATE_VOTE, note }),
        setBoardId: (boardId: string) => dispatch({ type: ActionTypes.SET_BOARDID, boardId }),
        setUserId: (userId: string) => dispatch({ type: ActionTypes.SET_USERID, userId }),
        socketConnect: (userId: string, boardId: string) => dispatch({ type: ActionTypes.SOCKET_CONNECT, userId, boardId }),
        updateSafetyScore: (value: number) => dispatch({ type: ActionTypes.UPDATE_SAFETY_SCORE, value }),
        sortBoardData: () => dispatch({type: ActionTypes.SORT_BOARD_DATA})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
