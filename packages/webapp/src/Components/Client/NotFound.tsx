import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'URL Not Found'}
            <Link to='/'>
                <Button>
                    Change BG
                </Button>
            </Link>
        </Typography>
    );
}