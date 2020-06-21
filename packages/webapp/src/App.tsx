import React from 'react';
import {Grid, Card, IconButton, CardActions, CardContent} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './App.css';

function App() {
  return (
    <div>
      <body className="App-body">
        <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Card>
            <CardContent>
              Something
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <AddIcon/>
              </IconButton>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              Something
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <AddIcon/>
              </IconButton>
            </CardActions>
          </Card>   
        </Grid>
        <Grid container spacing={1}>
          <Card>
            <CardContent>
              Something
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <AddIcon/>
              </IconButton>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              Something
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <AddIcon/>
              </IconButton>
            </CardActions>
          </Card>   
        </Grid>
        </Grid>
      </body>
    </div>
  );
}

export default App;
