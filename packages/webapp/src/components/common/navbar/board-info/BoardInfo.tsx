import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import exportBoard from '../../../../services/export-board.service';
import Button from '@material-ui/core/Button';
import { ButtonGroup, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { ConnectionStatus, TState, TAction } from '../../../../store/interfaces';
import * as ActionTypes from '../../../../store/actions';


import './BoardInfo.scss';

type TBoardInfoStateProps = {
    boardId: string;
    connectionStatus: ConnectionStatus
}

type TBoardInfoDispatchProps = {
    addToastMessage: Function
}

type TBoardInfoProps = TBoardInfoStateProps & TBoardInfoDispatchProps;

const BoardInfo = ({ boardId, connectionStatus, addToastMessage }: TBoardInfoProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onClickBoardInfoHeading = async (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const onBoardCopyCLick = async (event: any) => {
        setAnchorEl(null);
        event.stopPropagation()
        const boardSharableLink = `${window.location.origin}/#/?boardId=${boardId}`;
        navigator.clipboard.writeText(boardSharableLink);
        addToastMessage('Board link copied');
    };

    const onExportBoard = (event: any) => {
        setAnchorEl(null);
        exportBoard(boardId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getConnectionText = () => connectionStatus === ConnectionStatus.CONNECTED ? 'connected' : 'disconnected';
    const getConnectionStatusIcon = () => <FiberManualRecordIcon style={{ color: connectionStatus === ConnectionStatus.CONNECTED ? 'green' : 'red' }} />

    return (
        <div className='board-info'>
            <span className="board-info">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button className="board-button-group" variant="outlined" onClick={onClickBoardInfoHeading}>
                        {`Board : ${boardId}`}
                        {Boolean(anchorEl) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </Button>
                </ButtonGroup>
                <Menu id="boardMenu"
                    getContentAnchorEl={null}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MenuItem dense><ListItemIcon>{getConnectionStatusIcon()}</ListItemIcon> <ListItemText className='list-item-text' primary={getConnectionText()} /></MenuItem>
                    <Divider light />
                    <MenuItem dense onClick={onBoardCopyCLick}><ListItemIcon><FileCopyRoundedIcon className="menuitem-icon" /></ListItemIcon> <ListItemText className='list-item-text' primary="Copy Board Link" /></MenuItem>
                    <MenuItem dense onClick={onExportBoard}><ListItemIcon><PictureAsPdfRoundedIcon className="menuitem-icon" /></ListItemIcon> <ListItemText className='list-item-text' primary="Export Board" /></MenuItem>
                </Menu>
            </span>
        </div>
    );
}

const mapStateToProps = (state: TState): TBoardInfoStateProps => ({
    boardId: state.boardId,
    connectionStatus: state.connectionStatus
});

const mapDispatchToProps = (dispatch: Dispatch<TAction>): TBoardInfoDispatchProps => ({
    addToastMessage: (message: string) => dispatch({ type: ActionTypes.ADD_TOAST_MESSAGE, message })
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardInfo);