import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, Divider, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Copyright from './Copyright';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
import PoinstCard from './PointsCard'
import CardDetailsModal from './CardDetailsModal'

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
            height: 'auto',
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
        gridHeadingType: {
            paddingTop: '10px'
        },
        iconButton: {
            textAlign: 'center',
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
        },
        poinsts: {
            height: 140,
            width: 320,
            margin: '8px'
        }
    });
});

const BackgroundHead = {
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://images.unsplash.com/photo-1578847298326-10909089ccdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80)',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: 'auto',
    padding: '0.5px'
};

export default () => {
    const classes = useStyles();
    const [boardData, setBoardData] = React.useState({});
    const [redirectToHomepage, setRedirectToHomepage] = React.useState(false);
    const { id: boardId } = useParams();
    const [open1st, setOpen1st] = React.useState(false);
    const [open2nd, setOpen2nd] = React.useState(false);
    const [open3rd, setOpen3rd] = React.useState(false);
    const [open4th, setOpen4th] = React.useState(false);

    console.log(boardData);

    const handleOpen1st = () => {
        setOpen1st(true);
    };
    const handleOpen2nd = () => {
        setOpen2nd(true);
    };
    const handleOpen3rd = () => {
        setOpen3rd(true);
    };
    const handleOpen4th = () => {
        setOpen4th(true);
    };

    const handleClose1st = () => {
        setOpen1st(false);
    };
    const handleClose2nd = () => {
        setOpen2nd(false);
    }; const handleClose3rd = () => {
        setOpen3rd(false);
    }; const handleClose4th = () => {
        setOpen4th(false);
    };

    useEffect(() => {
        const getBoardData = async () => {
            axios.get(`https://staging-the-retro-app.herokuapp.com/api/boards/${boardId}`)
                .then((axiosResponse) => {
                    setBoardData(axiosResponse.data);
                })
                .catch(err => {
                    setRedirectToHomepage(true);
                    console.log(err);
                });
        }

        getBoardData();
    }, [boardId]);

    if (redirectToHomepage) {
        return <Redirect push to='/' />
    }

    function ids(id:any) {
        if (id === 1) {
            return open1st;
        } if (id === 2) {
            return open2nd;
        } if (id === 3) {
            return open3rd;
        } if (id === 4) {
            return open4th;
        } else {
            return true;
        }
    }

    function categories(lableText: any, id: any) {
        return (
            <Grid container xs={10} className={classes.topGrid} justify="center" id={id}>
                <Grid item className={classes.gridHeadingType}>
                    <Typography variant="button" color="primary" className={classes.title}>
                        {lableText}
                    </Typography>
                </Grid>
                <Grid item >
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            if (id === 1) {
                                handleOpen1st();
                            } else if (id === 2) {
                                handleOpen2nd();
                            } else if (id === 3) {
                                handleOpen3rd();
                            } else {
                                handleOpen4th();
                            }
                        }}>
                        <AddCircleRoundedIcon
                            fontSize="default"
                            color="secondary"
                            id={id}
                        />
                    </IconButton>
                    <Modal
                        open={ids(id)}
                        onClose={() => {
                            if (id === 1) {
                                handleClose1st();
                            } else if (id === 2) {
                                handleClose2nd();
                            } else if (id === 3) {
                                handleClose3rd();
                            } else {
                                handleClose4th();
                            }
                        }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <CardDetailsModal />
                    </Modal>
                </Grid>
                <Grid item xs={12} justify="center" >
                    <Divider variant="fullWidth" className={classes.divider} />
                </Grid>
            </Grid>
        )
    };

    function FormRow() {
        return (
            <React.Fragment>
                {categories("What went well", 1)}
                
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                {categories("What didn't go well", 2)}
                
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                {categories("Action Items", 3)}
                
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />
                {categories("Appreciations", 4)}
                
            </React.Fragment>
        );
    }

    function FormCol() {
        return (
            <React.Fragment>
                <Grid container xs={10} className={classes.topGrid} direction="column" justify="flex-start" >
                    {[0, 1, 2].map((value) => (
                        <Grid key={value} item className={classes.gridHeadingType}>
                            {/* <Paper className={classes.poinsts} */}
                            <PoinstCard />
                            {/* /> */}

                        </Grid>
                    ))}
                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />


                <Grid container xs={10} className={classes.topGrid} direction="column">
                    {/* {[0, 1, 2].map((value) => (
                        <Grid key={value} item className={classes.gridHeadingType}>
                            <PoinstCard />
                        </Grid>
                    ))} */}
                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />

                <Grid container xs={10} className={classes.topGrid} direction="column" >
                    {/* {[0, 1, 2].map((value) => (
                        <Grid key={value} item className={classes.gridHeadingType}>
                            // <PoinstCard />
                        </Grid>
                    ))} */}

                </Grid>
                <Divider variant="fullWidth" orientation="vertical" flexItem className={classes.divider} />

                <Grid container xs={10} className={classes.topGrid} direction="column" >
                    {/* {[0, 1, 2].map((value) => (
                        <Grid key={value} item className={classes.gridHeadingType}>
                            <PoinstCard />
                        </Grid>
                    ))} */}
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

                    <Grid container spacing={1} className={classes.gridRow}>
                        <Grid container item xs={12} spacing={2}>
                            <FormCol />
                        </Grid>

                    </Grid>
                    <div style={{ marginTop: '10px' }}></div>
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
