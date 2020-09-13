import React, { useEffect } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { connect } from "react-redux";
import { TState } from "../../../store/interfaces";

type TToastMessageStateProps = {
    toastMessage: string;
}

const ToastMessage = ({ toastMessage }: TToastMessageStateProps) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (Boolean(toastMessage)) setOpen(true);
    }, [toastMessage])

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={toastMessage}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}

const mapStateToProps = (state: TState): TToastMessageStateProps => {
    return {
        toastMessage: state.toastMessage
    }
}

export default connect(mapStateToProps)(ToastMessage);