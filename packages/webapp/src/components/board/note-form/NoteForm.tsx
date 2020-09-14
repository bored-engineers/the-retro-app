import React, { useState, Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import draftToHtml from 'draftjs-to-html';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

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

class ControlledEditor extends Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }


    onEditorStateChange = (editorState: any) => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        this.props.handleEditorInput(draftToHtml(convertToRaw(editorState.getCurrentContent())));


        this.setState({
            editorState,
        });
    };
    //  options: [ 'fontSize', 'fontFamily',  'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    render() {
        const { editorState } = this.state as any;
        return (
            <Editor
                // toolbarOnFocus
                toolbar={{
                    options: ['inline', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image'],
                    inline: { inDropdown: true, options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { inDropdown: true, options: ['unordered', 'ordered'] },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true, defaultTargetOption: '_blank' }
                }}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}


const NoteForm = ({ noteForm, setNoteForm }: { noteForm: any, setNoteForm: any }) => {

    const [modalStyle] = useState(getModalStyle);
    const [textAreaValue, setTextAreaValue] = useState();
    const handleClose = () => { setNoteForm({ ...noteForm, open: false }); setTextAreaValue(''); };

    const textAreaChangeHandle = (event: any) => setTextAreaValue(event.target.value);
    const handleEditorInput = (value: any) => setTextAreaValue(value);

    const addHandler = (event: any) => {
        const categoryId = noteForm.data.category;
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
            <ControlledEditor handleEditorInput={handleEditorInput} className="note-form-textarea"/>
            {/* <TextareaAutosize defaultValue={noteForm.data.text} onChange={textAreaChangeHandle} draggable='false' rows={5} rowsMax={10} className="note-form-textarea" /> */}
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