import React from 'react';
import { Typography, Button, Divider, Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

export class ErrorBoundary extends React.Component<{ children: any }, { hasError: boolean }> {
    constructor(props: { children: any }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <React.Fragment>
                <Grid container direction='column' alignItems='center' justify="space-between">
                    <Grid item>
                        <Typography variant='h4'>Something went wrong.</Typography>
                    </Grid>
                    <Divider variant='middle' />
                    <Grid item>
                        <Button color='secondary' variant='contained' startIcon={<HomeIcon />}>GO BACK HOME</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        }
        return this.props.children;
    }
}