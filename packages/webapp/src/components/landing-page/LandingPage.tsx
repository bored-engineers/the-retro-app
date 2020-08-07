import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
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
import { useHistory } from 'react-router'

import { createBoard, joinBoard } from '../../services/board.service';
import './LandingPage.scss';
import boardImage from '../../assets/board.svg';


const LandingPage = () => {
    const browserHistory = useHistory();

    const [boardId, setBoardId] = useState('');
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
                setBoardId(boardId);
                setCreateBoardSuccess(true);
            })
            .catch(error => {
                setCreateBoardError(true);
            }).finally(() => {
                setCreateBoardProgress(false)
            });
    };

    const getUserIdForBoard = (boardId: string) => {
        const USER_ID_KEY = `userIdforboard ${boardId}`;
        let userId = localStorage.getItem(USER_ID_KEY);
        if (!userId) {
            userId = uuid();
            localStorage.setItem(USER_ID_KEY, userId);
        }
        return userId;
    }

    const joinBoardHandler = () => {
        if (!boardId) return setJoinBoardError({ errorField: 'boardId', message: 'Board id is required' });

        setJoinBoardProgress(true);
        setJoinBoardError({ errorField: '', message: '' });
        joinBoard(boardId, getUserIdForBoard(boardId))
            .then(boardJoiningResult => {
                const { boardId, userId } = boardJoiningResult;
                browserHistory.push(`/boards/${boardId}?username=${userId}`);
            })
            .catch(error => {
                setJoinBoardError({ errorField: 'boardId', message: error.message });
            })
            .finally(() => {
                setJoinBoardProgress(false);
            });
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
                        {createBoardSuccess && <FormHelperText>Your board created successfully. You can join now...</FormHelperText>}
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
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default LandingPage;
