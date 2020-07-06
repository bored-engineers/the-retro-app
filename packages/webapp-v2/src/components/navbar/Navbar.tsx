import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";

import './Navbar.scss';

const getAvatarAlphabet = (username: string) => username[0] || 'U';

const Navbar = (props: { username: string }) => {
    return (
        <div className='navbar'>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className='title'>The Retro App</Typography>
                    <Avatar className='user-icon'>{getAvatarAlphabet(props.username)}</Avatar>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;