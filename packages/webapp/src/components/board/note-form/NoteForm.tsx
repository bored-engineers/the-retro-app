import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import './NoteForm.scss'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const NoteForm = ({ noteForm, setNoteForm }: { noteForm: any, setNoteForm: any }) => {

    const [modalStyle] = useState(getModalStyle);
    const [textAreaValue, setTextAreaValue] = useState();
    const handleClose = () => { setNoteForm({ ...noteForm, open: false }); setTextAreaValue(''); };

    const textAreaChangeHandle = (event: any) => setTextAreaValue(event.target.value);

    const CATEGORIES_ID_MAP = new Map<string, string>()
        .set('wentWell', 'went-well')
        .set('notWell', 'not-well')
        .set('actionItems', 'action-items')
        .set('appreciations', 'appreciations');

    const addHandler = (event: any) => {
        const categoryId = CATEGORIES_ID_MAP.get(noteForm.data.category);
        const text = textAreaValue;
        noteForm.createNoteHandler(categoryId, text);
        setTextAreaValue('');
        setNoteForm({ ...noteForm, open: false });
    }

    const updateHandler = (event: any) => {
        const text = textAreaValue;
        noteForm.updateNoteHandler({ ...noteForm.data, text });
        setTextAreaValue('');
        setNoteForm({ ...noteForm, open: false });
    }

    const body = (
        <div style={modalStyle} className='note-body'>
            <h2 className="note-form-category">{noteForm.data.categoryTitle}</h2>
            <TextareaAutosize defaultValue={noteForm.data.text} onChange={textAreaChangeHandle} draggable='false' rows={5} rowsMax={10} className="note-form-textarea" />
            <Button className='close-button' color="secondary" onClick={handleClose}>Cancel</Button>
            <Button className='add-button' color="primary" disabled={!Boolean(textAreaValue)} onClick={noteForm.state !== 'update' ? addHandler : updateHandler}>{noteForm.state !== 'update' ? 'Add' : 'Update'}</Button>
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