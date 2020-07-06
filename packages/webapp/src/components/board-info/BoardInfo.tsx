import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './BoardInfo.scss'


const BoardInfo = (props: { boardId: string }) => {
    return (
        <div className='board-info'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className='board-info-heading'>{`Board ID: ${props.boardId}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Lorem</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default BoardInfo;