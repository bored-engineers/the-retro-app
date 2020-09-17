import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import './SafetyCheck.scss';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const SafetyCheck = ({ safetyCheck, setSafetyCheck, safetyScoreSubmitHandle }: { safetyCheck: any, setSafetyCheck: any, safetyScoreSubmitHandle: any }) => {

    const [modalStyle] = useState(getModalStyle);
    const [safetyValue, setSafetyValue] = useState(-1);
    const marks = [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }];

    const valuetext = (value: number) => value.toString();
    const submitHandler = (event: any) => {
        safetyScoreSubmitHandle(safetyValue);
        handleClose();
    };

    const handleSliderChange = (event: any, value: number | number[]) => {
        setSafetyValue(value as number);
    };

    const handleClose = () => setSafetyCheck({ open: false });

    const body = (
        <div style={modalStyle} className='modal-body'>
            <h2 className="note-form-category">Safety Check</h2>
            <p>How comfortable are you for this retro?</p>
            <Slider className='safety-slider' onChange={handleSliderChange} defaultValue={1} min={1} max={5} step={1} marks={marks} getAriaValueText={valuetext} aria-labelledby="discrete-slider" />
            <Button className='submit-button' color="primary" disabled={safetyValue===-1} onClick={submitHandler}>Submit</Button>
        </div>
    );

    return (
        <div>
            <Modal open={safetyCheck.open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    );
}

export default SafetyCheck;
