import React, { useState, useEffect } from 'react'
import { Card, Button, Input } from 'antd';
import { LinkOutlined } from '@ant-design/icons'

const { TextArea } = Input;

function EditLink({ link, cancelEditItem, saveEditedItem, deleteItem }) {
    const [linkAddress, setLinkAddress] = useState('');

    useEffect(() => {
        if (link) {
            setLinkAddress(link.linkAddress);
        }
    }, [link])

    const handleUpdateLink = (e) => {
        e.preventDefault();
        link.linkAddress = linkAddress;
        saveEditedItem(link);
    }

    const handleDeleteLink = () => {
        deleteItem(link);
    }

    return (
        <Card size="small" className="new-note ml-10 mr-10" >
            <div className="new-link-header">
                <LinkOutlined style={{ fontSize: "1.1rem", marginTop: 6, }} />
                <TextArea
                    rows={4}
                    className="new-link-body"
                    placeholder="New Link"
                    autoSize={{ minRows: 2 }}
                    value={linkAddress}
                    onChange={e => setLinkAddress(e.target.value)}
                />
            </div>
            <div className="new-note-footer">
                <Button
                    type="text"
                    onClick={handleUpdateLink}
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
                    onClick={handleDeleteLink}
                >
                    Delete
                </Button>
            </div>
        </Card>
    )
}

export default EditLink
