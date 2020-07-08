import React, { useContext, useState } from 'react'
import { Card, Button, Input, message } from 'antd';
import './NewNote.css'
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';
import { motion } from 'framer-motion';

const { TextArea } = Input;

function NewNote() {
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteBody, setNewNoteBody] = useState('');

    const { addNewItem, discardNewItem } = useContext(GlobalStateContext)

    const handleSaveNote = (e) => {
        e.preventDefault();

        if (newNoteBody.trim() === '' && newNoteTitle.trim() === '') {
            message.error('Please provide either note title or body');
            return;
        }

        var newNoteObject = {
            title: newNoteTitle,
            body: newNoteBody
        }
        var isNoteAdded = addNewItem({ itemType: 'note', item: newNoteObject });

        switch (isNoteAdded) {
            case true:
                message.success('New Note added successfully.');
                setNewNoteTitle('');
                setNewNoteBody('');
                break;
            case false:
                message.error('New Note not added.');
                break;
            default:
                message.warning('Something went wrong. Please try again.');
                break;
        }
    }

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 800, opacity: 0 }}
            transition={{ duration: 0.2, type: "tween", }}
        >
            <Card size="small" className="new-note ml-10 mr-10" style={{ boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)" }} >
                <div className="new-note-header">
                    <Input
                        placeholder="Title"
                        allowClear
                        className="new-note-title"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                </div>
                <div >
                    <TextArea
                        rows={4}
                        className="new-note-body"
                        placeholder="Take a note..."
                        autoSize
                        value={newNoteBody}
                        onChange={(e) => setNewNoteBody(e.target.value)}
                    />
                </div>
                <div className="new-note-footer mt-20">
                    <Button
                        type="text"
                        onClick={e => handleSaveNote(e)}
                    >
                        Save
                </Button>
                    <Button
                        type="text"
                        className="ml-10"
                        danger
                        onClick={discardNewItem}
                    >
                        Discard
                </Button>
                </div>
            </Card>
        </motion.div>
    )
}

export default NewNote
