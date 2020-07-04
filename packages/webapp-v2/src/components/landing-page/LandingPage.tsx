import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import boardImage from '../../board.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {createBoard} from '../../services/board.service';

import './LandingPage.scss';


const LandingPage = () => {
    createBoard();
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
                        <Button variant="contained" color="primary">Create a New Board</Button>
                    </div>
                    <Divider variant="middle" flexItem />
                    <div className="join-board">
                        <Typography className='join-board-title' color="textSecondary" gutterBottom > 
                            Join an existing board 
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="boardId" variant="standard"  margin="dense">Board ID</InputLabel>
                            <Input id="boardId" fullWidth />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="username" variant="standard"  margin="dense">Your Name</InputLabel>
                            <Input id="username" fullWidth />
                        </FormControl>
                        <Button variant="contained" color="primary">Join Now</Button>
                    </div>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default LandingPage;