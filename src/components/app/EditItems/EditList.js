import React, { useState, useEffect } from 'react'
import { Card, Button, Input, Checkbox, message } from 'antd';
import { EnterOutlined, DeleteOutlined } from '@ant-design/icons'

function EditList({ existingList, cancelEditItem, saveEditedItem, deleteItem }) {
    const [listTitle, setListTitle] = useState('');
    const [newItem, setNewItem] = useState('');
    const [listItems, setListItems] = useState([]);


    useEffect(() => {
        setListTitle(existingList.title);
        setListItems(existingList.listItems);
    }, [existingList])

    const handleOnPressEnter = (e) => {
        e.preventDefault();
        if (newItem.trim() !== '') {
            var newObject = {
                id: Math.floor(Math.random() * 100000),
                text: newItem,
                createdAt: new Date(),
                done: false
            }
            setListItems([...listItems, newObject]);
            setNewItem('');
        }
    }

    const handleDeleteListItem = (e, id) => {
        e.preventDefault();
        var remainingListItem = listItems.filter(x => x.id !== id);
        setListItems(remainingListItem);
    }

    const handleDeleteCompleteList = () => {
        deleteItem(existingList);
    }

    const onCheckBoxChange = (id) => {
        if (listItems.length > 0) {
            var itemToChange = listItems.find(x => x.id === id);
            itemToChange.done = !itemToChange.done;
            var restOfList = listItems.filter(x => x.id !== id);
            setListItems([...restOfList, itemToChange]);
        }
    }

    const handleSaveListClick = (e) => {
        e.preventDefault();

        if (listItems.length <= 0) {
            message.error('Cannot save emplty todo list');
        }

        existingList.title = listTitle;
        existingList.listItems = listItems;

        var isListUpdated = saveEditedItem(existingList);

        switch (isListUpdated) {
            case true:
                message.success('List updated successfully.');
                setListTitle('');
                setNewItem('');
                setListItems([]);
                break;
            case false:
                message.error('Could not update list.');
                break;
            default:
                message.warning('Something went wrong. Please try again.');
                break;
        }
    }

    return (
        <Card size="small" className="new-note ml-10 mr-10 radius-5" >
            <div className="new-list-header">
                <Input
                    placeholder="Title"
                    allowClear
                    className="new-note-title"
                    value={listTitle}
                    onChange={e => setListTitle(e.target.value)}
                />
            </div>
            <div>
                <ul className="new-list-body pl-20">
                    {listItems.length > 0 ? (
                        listItems.sort((a, b) => a.createdAt - b.createdAt).map(item => {
                            return (
                                <li className="md-5" key={item.id}>
                                    <DeleteOutlined
                                        className="delete-list-item-icon"
                                        onClick={(e) => handleDeleteListItem(e, item.id)}
                                    />
                                    < Checkbox checked={item.done} onChange={() => onCheckBoxChange(item.id)}></Checkbox>
                                    <p className="m-0 ml-10">{item.text}</p>
                                </li>
                            )
                        })
                    ) : (
                            <></>
                        )}
                </ul>
                <Input
                    className="new-list-item ml-10 mr-10"
                    placeholder="New List item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onPressEnter={(e) => handleOnPressEnter(e)}
                    suffix={<EnterOutlined />}
                />
            </div>
            <div className="new-list-footer">
                <Button
                    type="text"
                    onClick={e => handleSaveListClick(e)}
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
                    onClick={handleDeleteCompleteList}
                >
                    Delete
                </Button>
            </div>
        </Card>
    )
}

export default EditList
