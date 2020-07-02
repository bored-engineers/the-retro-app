import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CircularProgress, Fab, TextField, Divider, Paper, Button, Grid, Typography, Tabs, Tab } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import clsx from 'clsx';
import TabPanel from './TabPanel';

const BackgroundHead = {
  backgroundImage: 'url(https://source.unsplash.com/user/bored_engineer/likes)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw',
  height: '100vh',
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    grid: {
      height: '80vh',
      fullWidth: '80vh',
    },
    paper: {
      margin: theme.spacing(2, 1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'fullWidth',
      justify: 'center',
    },
    buttons: {
      margin: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    createButton: {
      marginTop: '10px',
    },
    body: {
      margin: '0',
      height: '100%',
    },
    heading: {
      margin: '5px',
    },
    typo: {
      marginTop: '10px',
      variant: 'h4',
      color: 'primary',
    },
    grid_opac: {
      opacity: '0.8'
    },
    rootcreate: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },

  });
});

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [boardId, setBoardId] = React.useState('');
  const [name, setName] = React.useState('');

  const createBoard = async () => {
    axios.post('https://staging-the-retro-app.herokuapp.com/api/boards')
      .then((axiosResponse) => {
        setBoardId(axiosResponse.data.boardId);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleBoardIdChange = (event: any) => {
    setBoardId(event.target.value);
  }

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer: any = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      await createBoard();
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setValue(1);
        }, 500);
      }, 2000);
    }
  };

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
    setLoading(false);
    setSuccess(false);
  };

  return (
    <React.Fragment>
    <body id="body1" className={classes.body} style={BackgroundHead}>
      <div className={classes.root} style={BackgroundHead}>
        <Grid container component="main" className={classes.grid} direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square className={classes.grid_opac}>
            <Grid item xs >
              <Typography gutterBottom align='center' className={classes.typo}>
                Welcome to The Retro App
            </Typography>
            </Grid>
            <Divider variant="middle" />
            <div className={classes.paper}>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Create Board" {...a11yProps(0)} />
                <Tab label="Join Board" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  <Grid item>
                    <div className={classes.wrapper}>
                      <Fab
                        aria-label="save"
                        color="secondary"
                        className={buttonClassname}
                        onClick={handleButtonClick}
                      >
                        {success ? <CheckIcon /> : <FileCopyOutlinedIcon />}
                      </Fab>
                      {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div>
                  </Grid>
                  <Grid item alignItems='baseline' className={classes.createButton}>
                    <div className={classes.wrapper}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={buttonClassname}
                        disabled={loading}
                        onClick={handleButtonClick}
                      >
                        Create New Board
                      </Button>
                      {/* {loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="userID"
                      name="userId"
                      label="Name"
                      fullWidth
                      autoComplete="Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="boardId"
                      name="boardId"
                      label="Board ID"
                      fullWidth
                      autoComplete="Board ID"
                      value={boardId}
                      onChange={handleBoardIdChange}
                    />
                  </Grid>
                  <Link to={`/board/${boardId}`}>
                  <Button variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Join
                  </Button>
                  </Link>
                </Grid>
              </TabPanel>
            </div>
          </Grid>
        </Grid>
      </div>
    </body >
    </React.Fragment>
  );
}
