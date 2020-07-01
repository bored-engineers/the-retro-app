import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">Bored-Engineers</Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}