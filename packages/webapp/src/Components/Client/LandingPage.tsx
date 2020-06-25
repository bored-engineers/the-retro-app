import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
 const BackgroundHead = {
    backgroundImage: 'url(https://source.unsplash.com/user/bored_engineer/likes)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    }

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
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
        }

    });
});

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
      <body id="body1" className={classes.body} style={BackgroundHead}>
    <div className={classes.root} style={BackgroundHead}>
    <Grid container component="main" className={classes.grid}  direction="row" justify="center" alignItems="center">
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
      <Grid item xs={12}>
          <TextField
            required
            id="boardId"
            name="boardId"
            label="Board Id"
            fullWidth
            autoComplete="Board Id"
          />
        </Grid>
        <Button variant="contained"
                    color="primary"
                    className={classes.button}>
        Create
        </Button>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
            required
            id="boardId"
            name="boardId"
            label="Board Id"
            fullWidth
            autoComplete="Board Id"
          />
        </Grid>
        <Button variant="contained"
                    color="primary"
                    className={classes.button}>
        Join
        </Button>
      </Grid>
      </TabPanel>
        </div>
      </Grid>
      </Grid>
    </div>
    </body>
  );
}
