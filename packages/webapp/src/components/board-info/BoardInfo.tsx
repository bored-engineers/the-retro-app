import React from 'react';
import Typography from '@material-ui/core/Typography';
import { exportBoard } from '../../services/board.service'
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import './BoardInfo.scss'
import { ButtonGroup, Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router'
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import FeedbackRoundedIcon from '@material-ui/icons/FeedbackRounded';

type BoardInfoPropType = {
    boardId: string;
};

const BoardInfo = ({ boardId }: BoardInfoPropType) => {
    const browserHistory = useHistory();

    const [openTooltip, setOpenTooltip] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onClickBoardInfoHeading = async (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const onBoardCopyCLick = async (event: any) => {
        setAnchorEl(null);
        event.stopPropagation()
        navigator.clipboard.writeText(boardId);
        setOpenTooltip(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenTooltip(false);
      };

    const onExportBoard = (event: any) => {
        setAnchorEl(null);
        exportBoard(boardId);
    };

    const onFeedBack = (event: any) => {
        setAnchorEl(null);
        browserHistory.push(`/survey`);
    };
    const handleClose = () => {
       setAnchorEl(null);
      };

    return (
        <div className='board-info'>
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
                    <Tooltip title={`Board ID: ${boardId}`} aria-label="copy" placement="top-start">
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button className="board-button-group" variant="outlined" onMouseOver={onClickBoardInfoHeading}>{`Board : ${boardId}`}</Button>
                        </ButtonGroup>
                    </Tooltip>
                    <Menu
                        id="board-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className="board-menu"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem className="board-menu" onClick={onBoardCopyCLick}><FileCopyRoundedIcon className="menuitem-icon" /><Typography className="menuitem-text" variant="button">COPY BOARD ID</Typography></MenuItem>
                        <MenuItem className="board-menu" onClick={onExportBoard}><PictureAsPdfRoundedIcon className="menuitem-icon" /><Typography className="menuitem-text" variant="button">EXPORT BOARD AS PDF</Typography></MenuItem>
                    </Menu>
                </span>
            </Tooltip>
            <Button onClick={onFeedBack}><FeedbackRoundedIcon className="feedback-button" /></Button>
        </div>
    );
}
export default BoardInfo;