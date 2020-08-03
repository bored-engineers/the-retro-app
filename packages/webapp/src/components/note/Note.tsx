import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button, IconButton, Badge, Box, Tooltip } from "@material-ui/core";

import './Note.scss';

const Note = ({ note, setNoteForm, updateNoteHandler, updateVoteHandler, deleteHandler }: any) => {
  const editNoteHandler = () => {
    setNoteForm({ open: true, updateNoteHandler: updateNoteHandler, data: note, state: 'update' });
  }

  const deleteClickHandler = () => {
    deleteHandler(note.cardId);
  }

  const voteHandler = () => {
    updateVoteHandler(note);
  }

  return (
    <div className="note">
    <Box boxShadow={5} className="card-box">
      <Card variant="outlined" >
        <CardContent>
          <Typography variant="body2" component="p" className='note-content-text'>
            {note.text}
          </Typography>
        </CardContent>
        <Badge badgeContent={note.votes.length} color='primary'>
        <Tooltip title="Click to Vote">
          <IconButton onClick={voteHandler} className='vote-button'>
            <AddCircleOutlineIcon/>
          </IconButton>
          </Tooltip>
          </Badge>
        <Button color='primary' className='edit-button' onClick={editNoteHandler}>Edit</Button>
        <Button color='primary' className='edit-button' onClick={deleteClickHandler}>DELETE</Button>
      </Card>
      </Box>
    </div>
  )
};

export default Note;