import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import IconButton from '@material-ui/core/IconButton';
import { exportBoard } from '../../services/board.service'

import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import SafetyChart from '../safety-chart/SafetyChart';
import './BoardInfo.scss'

type BoardInfoPropType = {
    boardId: string;
    safetyScores: number[];
};

const BoardInfo = ({ boardId, safetyScores }: BoardInfoPropType) => {

    const [isSafe, setIsSafe] = useState(false);
    const [openTooltip, setOpenTooltip] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onClickBoardInfoHeading = async (event: any) => {
        event.stopPropagation()
        navigator.clipboard.writeText(boardId);
        setOpenTooltip(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenTooltip(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const onSafetyResultClickHandler = (event: any) => {
        event.stopPropagation()
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    useEffect(() => {
        setIsSafe(safetyScores.every(score => score > 3));
    }, [safetyScores]);

    return (
        <div className='board-info'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="additional-actions1-content" aria-label="Expand" id="panel1a-header">
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        open={openTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Successfully copied to clipboard"
                        placement="bottom-start"
                    >
                        <span className="board-info">
                            <Tooltip title="Click to copy Board Id" aria-label="copy" placement="top-start">
                                <Typography onClick={onClickBoardInfoHeading} className='board-info-heading'>{`Board ID: ${boardId}`}</Typography>
                            </Tooltip>
                        </span>
                    </Tooltip>
                    <Button variant="outlined" color={isSafe ? 'primary' : 'secondary'} onClick={onSafetyResultClickHandler}> Safty Result: {isSafe ? 'Safe' : 'False'} <InfoOutlinedIcon className='safety-result-info' /></Button>

                    <Typography className='safety-score-info'></Typography>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Paper variant='elevation' elevation={3} className='safety-graph'><SafetyChart data={safetyScores} /></ Paper>
                    </Popper>
                </AccordionSummary>
                <AccordionDetails>
                    <span className='export-button'>Export Board<IconButton onClick={() => {
                        exportBoard(boardId)
                    }}><GetAppRoundedIcon className='export-icon' /></IconButton></span>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default BoardInfo;