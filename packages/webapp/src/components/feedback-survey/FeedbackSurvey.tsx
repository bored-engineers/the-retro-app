import React from 'react';
import { AppBar, Toolbar, Avatar, Typography } from '@material-ui/core';
import HomeLogo from '../../assets/Logo.png';
import { useHistory } from 'react-router'

import './FeedbackSurvey.scss';

const formConfig = {
    formURL: "https://docs.google.com/forms/d/e/1FAIpQLSfqT9s6QjK01PLeezQTP2iYdU3C-HXXgmHzSlj830tPRvIp9g/viewform?usp=sf_link"
}

const FeedbackSurvey = () => {
    const browserHistory = useHistory();
    return (

    <div className="form-div">
     <AppBar position="static">
                <Toolbar className="toolbar">
                        <Avatar variant="rounded" src="Logo.png" className="navbar-logo" onClick={() => { browserHistory.push('/') }}>
                            <img alt="Home Logog" src={HomeLogo} />
                        </Avatar>
                    <Typography variant="h6" className='title'>The Retro App</Typography>
                </Toolbar>
            </AppBar>
        <iframe title="Retro Feedback "className="form-div" src={formConfig.formURL}></iframe>
    </div>

    )
}
export default FeedbackSurvey;