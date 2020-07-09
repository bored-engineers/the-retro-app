import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import IconButton from '@material-ui/core/IconButton';
import { exportBoard } from '../../services/board.service'


import './BoardInfo.scss'


const BoardInfo = (props: { boardId: string }) => {
    return (
        <div className='board-info'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className='board-info-heading'>{`Board ID: ${props.boardId}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                   <span className='export-button'>Export Board<IconButton onClick={() => {
                      exportBoard(props.boardId)
                   }}><GetAppRoundedIcon className='export-icon'/></IconButton></span> 
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default BoardInfo;