import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Button, Badge, Tooltip, Box, Divider } from "@material-ui/core";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import './Note.scss';

const Note = ({ userId, note, setNoteForm, updateNoteHandler, updateVoteHandler, deleteHandler, presenting }: any) => {
  const editNoteHandler = () => {
    if (!presenting) {
      setNoteForm({ open: true, updateNoteHandler: updateNoteHandler, data: note, state: 'update' });
    }
  }

  const deleteClickHandler = () => {
    if (!presenting) {
      deleteHandler(note.cardId);
    }
  }

  const voteHandler = () => {
    if (!presenting) {
      updateVoteHandler(note);
    }

  }

  const hasVoted = () => note.votes.includes(userId)

  const getVoteIconTitle = () => {
    if (presenting) {
      return 'Exit Presentation Mode to Vote';
    }
    return hasVoted() ? 'DOWN VOTE' : 'UP VOTE';
  }

  const getDeleteIconTitle = () => {
    if (presenting) {
      return 'Exit Presentation Mode to Delete';
    }
    return 'Delete this Note';
  }

  const getEditIconTitle = () => {
    if (presenting) {
      return 'Exit Presentation Mode to Edit';
    }
    return 'Edit this Note';
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
          <Divider variant="middle" />
          <div className="card-actions">
            <Tooltip title={getVoteIconTitle()}>
              <Button size="small" onClick={voteHandler}>
                <Badge badgeContent={note.votes.length} color="secondary" >
                  {presenting && <ThumbUp color='inherit' />}
                  {!presenting && (hasVoted() ? <ThumbUp color='primary' /> : <ThumbUpOutlinedIcon />)}
                </Badge>
              </Button>
            </Tooltip>
            <Tooltip title={getEditIconTitle()}>
              <Button size="small" color='primary' className='edit-button' onClick={editNoteHandler}><EditRoundedIcon /></Button>
            </Tooltip>
            <Tooltip title={getDeleteIconTitle()}>
              <Button size="small" color='primary' className='edit-button' onClick={deleteClickHandler}><DeleteRoundedIcon /></Button>
            </Tooltip>
          </div>
        </Card>
      </Box>
    </div >
  )
};

export default Note;