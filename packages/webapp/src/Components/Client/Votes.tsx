import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ExposurePlus1RoundedIcon from '@material-ui/icons/ExposurePlus1Rounded';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginBottom: theme.spacing(2),
      },
      '& .MuiBadge-root': {
        marginRight: theme.spacing(4),
      },
    },
  }),
);

export default () => {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);

  return (
    <div className={classes.root}>
      <div>
        <Badge color="secondary" badgeContent={count}>
        <IconButton aria-label="add to favorites"
        onClick={() => {
            setCount(count + 1);
          }}>
          <ExposurePlus1RoundedIcon />
        </IconButton>
        </Badge>
      </div>
    </div>
  );
}
