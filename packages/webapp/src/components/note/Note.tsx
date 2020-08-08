import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Button, IconButton, Badge, Tooltip, Box } from "@material-ui/core";

import './Note.scss';

const Note = ({ userId, note, setNoteForm, updateNoteHandler, updateVoteHandler, deleteHandler }: any) => {
  const editNoteHandler = () => {
    setNoteForm({ open: true, updateNoteHandler: updateNoteHandler, data: note, state: 'update' });
  }

  const deleteClickHandler = () => {
    deleteHandler(note.cardId);
  }

  const voteHandler = () => {
    updateVoteHandler(note);
  }

  const hasVoted = () => note.votes.includes(userId)

  return (
    <div className="note">
      <Box boxShadow={5} className="card-box">
        <Card variant="outlined" >
          <CardContent>
            <Typography variant="body2" component="p" className='note-content-text'>
              {note.text}
            </Typography>
          </CardContent>
          <Tooltip title={hasVoted() ? 'downvote' : 'upvote'}>
            <IconButton onClick={voteHandler}>
              <Badge badgeContent={note.votes.length} color="secondary" >
                {hasVoted() ? <ThumbUp color='primary' /> : <ThumbUpOutlinedIcon />}
              </Badge>
            </IconButton>
          </Tooltip>
          <Button color='primary' className='edit-button' onClick={editNoteHandler}>Edit</Button>
          <Button color='primary' className='edit-button' onClick={deleteClickHandler}>DELETE</Button>
        </Card>
      </Box>
    </div >
  )
};

export default Note;