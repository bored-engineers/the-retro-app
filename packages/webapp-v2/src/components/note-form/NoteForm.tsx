import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import './NoteForm.scss'
import Button from '@material-ui/core/Button';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const NoteForm = ({ noteForm, setNoteForm }: { noteForm: any, setNoteForm: any}) => {

    const [modalStyle] = useState(getModalStyle);
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleClose = () => { setNoteForm({ ...noteForm, open: false }) };

    const textAreaChangeHandle = (event: any) => setTextAreaValue(event.target.value);

    const addHandler = (event: any) => {
        const categoryId = noteForm.data.category;
        const text = textAreaValue;
        noteForm.createNoteHandler(categoryId, text);
        setNoteForm({ ...noteForm, open: false });
    }

    const body = (
        <div style={modalStyle} className='note-body'>
            <h2 className="note-form-category">{noteForm.data.categoryTitle}</h2>
            <TextareaAutosize onChange={textAreaChangeHandle} draggable='false' rows={5} rowsMax={10} className="note-form-textarea" />
            <Button className='close-button' color="secondary" onClick={handleClose}>Cancel</Button>
            <Button className='add-button' color="primary" onClick={addHandler}>Add</Button>
        </div>
    );


    return (
        <div>
            <Modal open={noteForm.open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    );
}

export default NoteForm;