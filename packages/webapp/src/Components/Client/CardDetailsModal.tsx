import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, TextareaAutosize } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'fixed',
      width: 400,
      //backgroundColor: theme.palette.background.paper,
      border: '0px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(0.5, 0.5, 0.5),
    },
    root: {
        minWidth: 350,
        height: 330,
        padding: '5px'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      textArea: {
          width: 350,
          height: 300,
      }
  }),
);

export default () => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  const handleChangeText = (event:any) => {
    setTextAreaValue(event.target.value);
  }
  const handleAddButtonClick = () =>{
      console.log(textAreaValue);
 }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card className={classes.root}>
      <CardContent>
        <TextareaAutosize
      rows={17}
      aria-label="maximum height"
      placeholder="Add your points here"
      onChange={handleChangeText}
      className={classes.textArea}
    />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" size="medium" onClick={handleAddButtonClick}>Add</Button>
      </CardActions>
    </Card>
    </div>
  );

  return (
    <div>
        {body}
    </div>
  );
}
