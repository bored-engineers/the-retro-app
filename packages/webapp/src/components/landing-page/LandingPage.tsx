import {v4 as uuid} from 'uuid';
import React, {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {TAction, TState} from '../../store/interfaces';
import * as ActionTypes from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory, useLocation} from 'react-router';
import {createBoard, joinBoard} from '../../services/board.service';
import './LandingPage.scss';
import {getUserIDStorageKey} from '../../common-utils';
import {Input, LinearProgress, Link} from '@material-ui/core';
import LogoImage from '../../assets/Logo.png'
import MainImage from '../../assets/main-image.svg'
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';

type TLandingPageDispatchProps = {
    setUserId: Function,
    setBoardId: Function
}

type TLandingPageStateProps = {
    userId: string;
    boardId: string;
}

type TLandingPageProps = TLandingPageDispatchProps & TLandingPageStateProps;

const useStyles = makeStyles(theme => ({
    mainImageContainer: {
        position: 'relative',
        '&::before': {
            content: '""',
            left: '7.5vw',
            top: '-1vh',
            position: 'absolute',
            width: '6vw',
            height: '6vw',
            borderRadius: '6vw',
            backgroundColor: '#F2F2F2',
            zIndex: '-5',
            animation: '$grow 10s infinite'
        },
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
    },
    '@keyframes grow': {
        '0%': {transform: 'scale(0.5)'},
        '50%': {transform: 'scale(1)'},
        '100%': {transform: 'scale(0.5)'}
    }
}))


const LandingPage = (props: TLandingPageProps) => {
    const classes = useStyles();
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
            <Typography variant="body1" color="textSecondary" align="center">
            {'From the minds of '}
            <Link color="primary" href="https://github.com/orgs/bored-engineers/people" target="_black">
           <b>Bored Engineers</b>
            </Link>{' '}
          </Typography>
        );
      }

    return (
        <React.Fragment>
            <div className="ocean">
                <div className="wave"></div>
            </div>
            <Grid container className="main" justify="space-between" direction="column">
                <Grid container item justify="space-between" direction="row">
                    <Grid item sm={6}><img src={LogoImage} alt="logo" width="256" height="60"/></Grid>
                    <Grid container item sm={6} direction="row-reverse">
                        <IconButton><TwitterIcon fontSize="large"/></IconButton>
                        <IconButton><FacebookIcon fontSize="large"/></IconButton>

                    </Grid>
                </Grid>
                <Grid container item className="row" justify="space-evenly" direction="row">
                    <Grid container md={6} item justify="center" className={classes.mainImageContainer}>
                        <img className="main-image" src={MainImage} alt="main" width="550"/>
                    </Grid>
                    <Grid container md={6} item justify="center">
                        <div className="form">
                            <Typography variant="h5">Let's get started...</Typography>
                            <Button
                                className="button"
                                variant="contained"
                                color="primary"
                                onClick={createBoardHandler}
                                disabled={createBoardProgress}
                            >Create New Board</Button>
                            {createBoardProgress && <LinearProgress />}
                            {createBoardError && <FormHelperText error>There is some problem creating board. Try Again Later...</FormHelperText>}
                            {createBoardSuccess && getSuccessElements()}
                            <Divider/>
                            <Typography className="join-text">Or Join An Existing Board</Typography>
                            <Input
                                className="input" placeholder="Board Id"
                                value={boardId}
                                onChange={event => setBoardId(event.target.value)}
                                disabled={createBoardProgress || joinBoardProgress}
                                error={joinBoardError.errorField === 'boardId'}/>
                            <Button className="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={joinBoardHandler}
                                    disabled={createBoardProgress || joinBoardProgress}
                            >Join Now</Button>
                            {joinBoardProgress && <LinearProgress/>}
                            {joinBoardError && <FormHelperText error>{joinBoardError.message}</FormHelperText>}
                            <Typography variant="caption" className="caption">By joining, I agree to the Terms and
                                Privacy Policy.</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container item/>
                <Grid container item justify="flex-end"><Branding/></Grid>
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
