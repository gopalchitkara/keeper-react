import React, { useState, useEffect } from 'react'
import { Card, Button, Input } from 'antd';

const { TextArea } = Input;

function EditNote({ note, cancelEditItem, saveEditedItem, deleteItem }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setBody(note.body);
        }
    }, [note])

    const handleUpdateNote = (e) => {
        e.preventDefault();
        note.title = title;
        note.body = body;
        saveEditedItem(note);
    }

    const handleDeleteNote = () => {
        deleteItem(note);
    }

    return (
        <Card size="small" className="new-note ml-10 mr-10" >
            <div className="new-note-header">
                <Input
                    placeholder="Title"
                    allowClear
                    className="new-note-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div >
                <TextArea
                    rows={4}
                    className="new-note-body"
                    placeholder="Take a note..."
                    autoSize
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className="new-note-footer mt-20">
                <Button
                    type="text"
                    onClick={e => handleUpdateNote(e)}
                >
                    Update
                </Button>
                <Button
                    type="text"
                    className="ml-10"
                    onClick={cancelEditItem}
                >
                    Cancel
                </Button>
                <Button
                    type="text"
                    danger
                    onClick={handleDeleteNote}
                >
                    Delete
                </Button>
            </div>
        </Card>
    )
}

export default EditNote
