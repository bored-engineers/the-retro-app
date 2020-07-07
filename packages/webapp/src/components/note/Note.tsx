import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

import './Note.scss';

const Note = ({ note, setNoteForm, updateNoteHandler }: any) => {

  const editNoteHandler = () => {
    setNoteForm({ open: true, updateNoteHandler: updateNoteHandler, data: note, state: 'update' });
  }

  return (
    <div className="note">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" component="p" className='note-content-text'>
            {note.text}
          </Typography>
        </CardContent>
        <Button color='primary' className='edit-button' onClick={editNoteHandler}>Edit</Button>
      </Card>
    </div>
  )
};

export default Note;