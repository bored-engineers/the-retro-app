import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { CssBaseline, Typography } from "@material-ui/core";

import './Footer.scss';

const Footer = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="default" className='custom-footer'>
                <Toolbar className="toolbar">
                    <Typography className='branding-text' variant="caption" display="block" gutterBottom>From the minds of Bored Engineers</Typography>
                    <Typography className='feedback-text' variant="caption" display="block" gutterBottom>Please provide your valueble feedback <a href='#/survey'>here</a>.</Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Footer;