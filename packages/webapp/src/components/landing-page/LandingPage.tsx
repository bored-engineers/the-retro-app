import { v4 as uuid } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TState, TAction } from '../../store/interfaces';
import * as ActionTypes from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import LinearProgress from '@material-ui/core/LinearProgress'
import FormHelperText from '@material-ui/core/FormHelperText'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router';

import { createBoard, joinBoard } from '../../services/board.service';
import './LandingPage.scss';
import boardImage from '../../assets/board.svg';
import { getUserIDStorageKey } from '../../common-utils';
import { Box, Link } from '@material-ui/core';

type TLandingPageDispatchProps = {
    setUserId: Function,
    setBoardId: Function
}

type TLandingPageStateProps = {
    userId: string;
    boardId: string;
}

type TLandingPageProps = TLandingPageDispatchProps & TLandingPageStateProps;


const LandingPage = (props: TLandingPageProps) => {
    const {setUserId, setBoardId, boardId} = props;
    const browserHistory = useHistory();
    const location = useLocation();

    const [createBoardProgress, setCreateBoardProgress] = useState(false);
    const [createBoardSuccess, setCreateBoardSuccess] = useState(false);
    const [createBoardError, setCreateBoardError] = useState(false);

    const [joinBoardProgress, setJoinBoardProgress] = useState(false);
    const [joinBoardError, setJoinBoardError] = useState({ errorField: '', message: '' });

    const createBoardHandler = () => {
        setCreateBoardProgress(true);
        setCreateBoardError(false);
        setCreateBoardSuccess(false);
        createBoard()
            .then(boardId => {
                browserHistory.push(`/?boardId=${boardId}`);
                setCreateBoardSuccess(true);
            })
            .catch(error => {
                setCreateBoardError(true);
            }).finally(() => {
                setCreateBoardProgress(false)
            });
    };

    const getUserIdFromLocalStorage = () => {
        const USER_ID_KEY = getUserIDStorageKey(boardId);
        const userIdInLocalStorage = localStorage.getItem(USER_ID_KEY);
        if (!userIdInLocalStorage) {
            const newUserId = uuid();
            localStorage.setItem(USER_ID_KEY, newUserId);
            return newUserId;
        }
        return userIdInLocalStorage;
    }

    const getUserIdForBoard = (): string => {
        const userIdFromLocalStorage = getUserIdFromLocalStorage();
        setUserId(userIdFromLocalStorage);
        return userIdFromLocalStorage;
    }

    const joinBoardHandler = () => {
        if (!boardId) return setJoinBoardError({ errorField: 'boardId', message: 'Board id is required' });

        setJoinBoardProgress(true);
        setJoinBoardError({ errorField: '', message: '' });
        joinBoard(boardId, getUserIdForBoard())
            .then(boardJoiningResult => {
                const { boardId } = boardJoiningResult;
                browserHistory.push(`/boards/${boardId}`);
            })
            .catch(error => {
                setJoinBoardError({ errorField: 'boardId', message: error.message });
            })
            .finally(() => {
                setJoinBoardProgress(false);
            });
    }

    const onCopyHandler = async (event: any) => {
        event.stopPropagation();
        const boardSharableLink = `${window.location.origin}/#/?boardId=${boardId}`;
        navigator.clipboard.writeText(boardSharableLink);
    };

    const getSuccessElements = () => {
        return <>
            <FormHelperText>Your board created successfully. You can join now...</FormHelperText>
            <Button variant="contained" disabled={!createBoardSuccess} color="secondary" onClick={onCopyHandler}>Copy Sharable Link</Button>
        </>;
    };

    useEffect(() => {
        const boardId = new URLSearchParams(location.search).get('boardId');
        if (boardId) setBoardId(boardId);
    }, [location.search, setBoardId]);

    function Branding() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {'From the minds of '}
            <Link color="primary" href="https://github.com/orgs/bored-engineers/people" target="_black">
           <b>Bored Engineers</b>
            </Link>{' '}
          </Typography>
        );
      }
    return (
        <React.Fragment>
            <Grid container direction="column" justify="center" alignItems="center" className="landingPage">
                <Card className='form'>
                    <CardContent>
                        <Typography className='title-sup' color="textSecondary" gutterBottom>
                            Welcome to
                        </Typography>
                        <Typography variant="h5" component="h2" className="title-main">
                            The Retro App
                        </Typography>
                    </CardContent>
                    <div className="image"><img src={boardImage} alt="" /></div>
                    <div className="create-board">
                        <Button variant="contained" color="primary" onClick={createBoardHandler} disabled={createBoardProgress} >Create a New Board</Button>
                        {createBoardProgress && <LinearProgress />}
                        {createBoardError && <FormHelperText error>There is some problem creating board. Try Again Later...</FormHelperText>}
                        {createBoardSuccess && getSuccessElements()}
                    </div>
                    <Divider variant="middle" flexItem />
                    <div className="join-board">
                        <Typography className='join-board-title' color="textSecondary" gutterBottom >
                            Join an existing board
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="boardId" variant="standard" margin="dense">Board ID</InputLabel>
                            <Input id="boardId" fullWidth value={boardId} onChange={event => setBoardId(event.target.value)} disabled={createBoardProgress || joinBoardProgress} error={joinBoardError.errorField === 'boardId'} />
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={joinBoardHandler} disabled={createBoardProgress || joinBoardProgress} >Join Now</Button>
                        {joinBoardProgress && <LinearProgress />}
                        {joinBoardError && <FormHelperText error>{joinBoardError.message}</FormHelperText>}
                    </div>
                    <Box mt={2} className="footer">
                        <Branding />
                    </Box>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = (state: TState): TLandingPageStateProps => {
    return {
        boardId: state.boardId,
        userId: state.userId
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TAction>): TLandingPageDispatchProps => {
    return {
        setBoardId: (boardId: string) => dispatch({ type: ActionTypes.SET_BOARDID, boardId }),
        setUserId: (userId: string) => dispatch({ type: ActionTypes.SET_USERID, userId }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
