import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import {Grid, Card, IconButton, CardActions, CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
        Bored-Engineers
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => {
    return ({
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
        card: {
            margin: '10px',
            width: 150,
            height: 160,
        },
        cardcontent: {
            fontSize: 14
        },
        action: {
            alignContent: 'bottom',
        }
    });
});

  const BackgroundHead = {
    backgroundImage: 'url(https://source.unsplash.com/user/bored_engineer/likes)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    }

  export default function Album() {
    const classes = useStyles();

    return (
        <div>
            <NavBar />
          <body className="App-body" style={BackgroundHead}>
            <Grid container spacing={1}>
            <Grid container spacing={1}>
              <Card>
                <CardContent>
                  Something
                </CardContent>
                <CardActions >
                  <IconButton aria-label="add to favorites" className={classes.action}>
                    <AddIcon/>
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardContent>
                  Something
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <AddIcon/>
                  </IconButton>
                </CardActions>
              </Card>   
            </Grid>
            <Grid container spacing={1}>
              <Card>
                <CardContent>
                  Something
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <AddIcon/>
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardContent>
                  Something
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <AddIcon/>
                  </IconButton>
                </CardActions>
              </Card>   
            </Grid>
            </Grid>
          </body>
          {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            The Retro App
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
        </div>
      );
  }