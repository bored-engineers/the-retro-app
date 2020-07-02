import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Votes from './Votes';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      maxHeight: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);


export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings"
          onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
      />
      <Menu
             id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
             open={Boolean(anchorEl)}
            onClose={handleClose}
            >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Menu>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Votes/>
      </CardActions>
    </Card>
  );
}
