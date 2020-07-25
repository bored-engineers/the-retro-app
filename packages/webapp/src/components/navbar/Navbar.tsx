import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';

import './Navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className='title'>The Retro App</Typography>
                    <Avatar className='user-icon'>
                        <PersonIcon/>
                    </Avatar>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;