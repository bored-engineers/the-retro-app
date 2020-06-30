import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Grid, IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';

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
        },
        body: {
            margin: '0',
            height: '100%',
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        topDiv: {
            padding: '2px',
        },
        gridRow: {
            margin: '10px',
            alignItems: 'center'
        },
        iconButton: {
            textAlign: 'center'
        },
        divider: {
            // Dividers not consistent when zooming.
            // https://github.com/mui-org/material-ui/issues/14815
            borderTop: 'thin solid rgba(0, 0, 0, 0.12)', //this color should be theme.palette.divider if that is set
            backgroundColor: 'purple',
            height: undefined,
            margin: '7px'
        },
        title: {
            flexGrow: 1,
            margin: '5px',
            fontSize: '15px',
            fontWeight: 'bold',
        },
        topGrid: {
            alignContent: 'center',
            maxWidth: '23%',
        }
    });
});

const BackgroundHead = {
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://source.unsplash.com/user/bored_engineer/likes)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
};

export default function Album() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={3} className={classes.topGrid} >
                    <IconButton className={classes.iconButton}>
                        <AddCommentRoundedIcon
                            fontSize="default"
                            color="secondary"
                        />
                    </IconButton>
                    <Typography variant="button" color="primary" className={classes.title}>
                        What went well
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider} />
                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                <Grid item xs={3} className={classes.topGrid}>
                    <IconButton>
                        <AddCommentRoundedIcon
                            fontSize="default"
                            color="secondary"
                        />
                    </IconButton>
                    <Typography variant="button" color="primary" className={classes.title}>
                        What didn't go well
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider} />
                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                <Grid item xs={3} className={classes.topGrid}>
                    <IconButton>
                        <AddCommentRoundedIcon
                            fontSize="default"
                            color="secondary"
                        />
                    </IconButton>
                    <Typography variant="button" color="primary" className={classes.title}>
                        Action Items
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider} />
                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                <Grid item xs={3} className={classes.topGrid}>
                    <IconButton>
                        <AddCommentRoundedIcon
                            fontSize="default"
                            color="secondary"
                        />
                    </IconButton>
                    <Typography variant="button" color="primary" className={classes.title}>
                       Appreciations
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider} />
                </Grid>
            </React.Fragment>
        );
    }
    return (
        <div>
            <NavBar />
            <body className={classes.body} style={BackgroundHead}>
                <div className={classes.topDiv}></div>
                <div>
                    <Grid container spacing={1} className={classes.gridRow}>
                        <Grid container item xs={12} spacing={2} alignItems="center">
                            <FormRow />
                        </Grid>

                    </Grid>

                </div>
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