import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router'
import HomeLogo from './Logo.png'

import './Navbar.scss';
import { IconButton } from "@material-ui/core";
const Navbar = () => {
    const browserHistory = useHistory();
    return (
        <div className='navbar'>
            <AppBar position="static">
                <Toolbar className="toolbar">
                    <IconButton onClick={()=>{browserHistory.push('/')}}>
                    <Avatar variant="rounded" src="Logo.png" className="navbar-logo">
                    <img alt="Home Logog" src={HomeLogo} />
                    </Avatar>
                    </IconButton>
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