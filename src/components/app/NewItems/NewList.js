import React, { useState, useContext } from 'react'
import { Card, Button, Input, Checkbox, message } from 'antd';
import { EnterOutlined, DeleteOutlined } from '@ant-design/icons'
import './NewList.css'
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

function NewList() {
    const [newListTitle, setNewListTitle] = useState('');
    const [newListItem, setNewListItem] = useState('');
    const [newList, setNewList] = useState([]);

    const { discardNewItem, addNewItem } = useContext(GlobalStateContext);

    const handleOnPressEnter = (e) => {
        e.preventDefault();
        if (newListItem.trim() !== '') {
            var newObject = {
                id: Math.floor(Math.random() * 100000),
                text: newListItem,
                createdAt: new Date(),
                done: false
            }
            setNewList([...newList, newObject]);
            setNewListItem('');
        }
    }

    const onCheckBoxChange = (id) => {
        if (newList.length > 0) {
            var itemToChange = newList.find(x => x.id === id);
            itemToChange.done = !itemToChange.done;
            var restOfList = newList.filter(x => x.id !== id);
            setNewList([...restOfList, itemToChange]);
        }
    }

    const handleDeleteListItem = (e, id) => {
        e.preventDefault();
        var remainingListItem = newList.filter(x => x.id !== id);
        setNewList(remainingListItem);
    }

    const handleSaveListClick = (e) => {
        e.preventDefault();

        if (newList.length <= 0) {
            message.error('Cannot save emplty todo list');
        }

        var newListObject = {
            title: newListTitle,
            listItems: newList
        }
        var isListAdded = addNewItem({ itemType: 'list', item: newListObject });

        switch (isListAdded) {
            case true:
                message.success('New List added successfully.');
                setNewListTitle('');
                setNewListItem('');
                setNewList([]);
                break;
            case false:
                message.error('New List not added.');
                break;
            default:
                message.warning('Something went wrong. Please try again.');
                break;
        }
    }

    return (
        <div>
            <Card size="small" className="new-note ml-10 mr-10 radius-5" style={{ boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)" }}>
                <div className="new-list-header">
                    <Input
                        placeholder="Title"
                        allowClear
                        className="new-note-title"
                        value={newListTitle}
                        onChange={e => setNewListTitle(e.target.value)}
                    />
                </div>
                <div>
                    <ul className="new-list-body pl-20">
                        {newList.length > 0 ? (
                            newList.sort((a, b) => a.createdAt - b.createdAt).map(item => {
                                return (
                                    <li className="md-5" key={item.id}>
                                        <DeleteOutlined
                                            className="delete-list-item-icon"
                                            onClick={(e) => handleDeleteListItem(e, item.id)}
                                        />
                                        <Checkbox checked={item.done} onChange={() => onCheckBoxChange(item.id)}></Checkbox>
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
                        value={newListItem}
                        onChange={(e) => setNewListItem(e.target.value)}
                        onPressEnter={(e) => handleOnPressEnter(e)}
                        suffix={<EnterOutlined />}
                    />
                </div>
                <div className="new-list-footer">
                    <Button
                        type="text"
                        onClick={e => handleSaveListClick(e)}
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
        </div>
    )
}

export default NewList
