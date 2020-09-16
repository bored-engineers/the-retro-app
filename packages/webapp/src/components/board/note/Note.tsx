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
            <div dangerouslySetInnerHTML={{ __html: note.text }} />
          </CardContent>
          <Divider variant="middle" />
          <div className="card-actions">
            <Tooltip title={hasVoted() ? 'DOWN VOTE' : 'UP VOTE'}>
              <Button size="small" onClick={voteHandler}>
                <Badge badgeContent={note.votes.length} color="secondary" >
                  {hasVoted() ? <ThumbUp color='primary' /> : <ThumbUpOutlinedIcon />}
                </Badge>
              </Button>
            </Tooltip>
            <Button size="small" color='primary' className='edit-button' onClick={editNoteHandler}><EditRoundedIcon /></Button>
            <Button size="small" color='primary' className='edit-button' onClick={deleteClickHandler}><DeleteRoundedIcon /></Button>
          </div>
        </Card>
      </Box>
    </div >
  )
};

export default Note;