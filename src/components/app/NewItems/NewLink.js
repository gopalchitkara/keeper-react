import React, { useContext, useState } from 'react'
import { Card, Button, Input, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons'
import './NewLink.css';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

const { TextArea } = Input;

function NewLink() {
    const [newLink, setNewLink] = useState('');

    const { discardNewItem, addNewItem } = useContext(GlobalStateContext);

    const handleLinkSave = (e) => {
        e.preventDefault();

        if (newLink.trim() === '') {
            message.error('Link cannot be empty');
            return;
        }

        if (!((newLink.indexOf('https://') === 0) || (newLink.indexOf('http://') === 0))) {
            message.error('Not a valid link');
            return;
        }

        if (newLink.lastIndexOf('.') <= 0) {
            message.error('Not a valid link');
            return;
        }

        var isLinkAdded = addNewItem({ itemType: 'link', item: { linkAddress: newLink } });

        switch (isLinkAdded) {
            case true:
                message.success('New Link added successfully.');
                setNewLink('');
                break;
            case false:
                message.error('New Link not added.');
                break;
            default:
                message.warning('Something went wrong. Please try again.');
                break;
        }
    }

    return (
        <Card size="small" className="new-note ml-10 mr-10 radius-5" style={{ boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)" }}>
            <div className="new-link-header">
                <LinkOutlined style={{ fontSize: "1.1rem", marginTop: 6, }} />
                <TextArea
                    rows={4}
                    className="new-link-body"
                    placeholder="New Link"
                    autoSize={{ minRows: 2 }}
                    value={newLink}
                    onChange={e => setNewLink(e.target.value)}
                />
            </div>
            <div className="new-note-footer">
                <Button
                    type="text"
                    onClick={handleLinkSave}
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
    )
}

export default NewLink
