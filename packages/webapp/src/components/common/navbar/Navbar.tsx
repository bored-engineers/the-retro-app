import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from 'react-router';
import HomeLogo from '../../../assets/Logo.png';
import BoardInfo from './board-info/BoardInfo';

import './Navbar.scss';

const Navbar = () => {
    const browserHistory = useHistory();
    return (
        <div className='navbar'>
            <AppBar position="static">
                <Toolbar className="toolbar">
                    <Avatar variant="rounded" src="Logo.png" className="navbar-logo" onClick={() => { browserHistory.push('/') }}>
                        <img alt="Home Logog" src={HomeLogo} />
                    </Avatar>
                    <Typography variant="h6" className='title'>The Retro App</Typography>
                    <div className='user-icon'>
                        <BoardInfo/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;