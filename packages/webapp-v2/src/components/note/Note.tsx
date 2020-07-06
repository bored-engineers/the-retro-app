import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import './Note.scss';

const Note = ({text}:{text: string}) => {
  return (
    <div className="note">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" component="p">
           {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
};

export default Note;