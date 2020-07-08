import React, { createContext, useState, useEffect } from 'react'

export const GlobalStateContext = createContext();

export const GlobalStateContextProvider = (props) => {
    const [stateItems, setStateItems] = useState([]);
    const [trash, setTrash] = useState([]);
    const [newItemType, setNewItemType] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState();
    const [checkingSavedItems, setCheckingSavedItems] = useState(true);
    const [checkingTrashStatus, setCheckingTrashStatus] = useState(true);

    useEffect(() => {
        var initStateItems = [
            { id: Math.floor(Math.random() * 100000), type: 'note', title: 'Welcome to keeper!', body: 'Hello! Welcome to keeper. This is a simple clone of google keep but with a different and custom UI. Currently, keeper can store Simple Notes, Links and Check Lists. This here is an example of a simple note.', createdAt: new Date() },
            { id: Math.floor(Math.random() * 100000), type: 'note', title: 'Adding Items.', body: 'Adding new items in keeper is very easy. Just click on any button in the left sidebar and by the way, did you check my website? no? the item to the right is a link. go ahead and click on it!', createdAt: new Date() },
            { id: Math.floor(Math.random() * 100000), type: 'link', linkAddress: 'https://gopalchitkara.in/', createdAt: new Date() },
            { id: Math.floor(Math.random() * 100000), type: 'note', title: 'Arranging and Updating Items', body: 'Keeper supports drag and drop to easily arrange the items as required and to edit an item just click on an item card.', createdAt: new Date() },
            {
                id: Math.floor(Math.random() * 100000), type: 'list', title: 'Intro to keeper.',
                listItems: [
                    { id: 48347, text: "What is keeper?", createdAt: "2020-07-08T14:04:36.010Z", done: true },
                    { id: 35785, text: "Adding items", createdAt: "2020-07-08T14:04:54.234Z", done: true },
                    { id: 15950, text: "Arranging items on dashboard", createdAt: "2020-07-08T14:05:21.896Z", done: true },
                    { id: 63714, text: "Updating Items", createdAt: "2020-07-08T14:05:29.758Z", done: true },
                    { id: 93442, text: "Unchecked Item", createdAt: "2020-07-08T14:07:04.524Z", done: false }
                ]
                , createdAt: new Date()
            },
            { id: Math.floor(Math.random() * 100000), type: 'note', title: 'To Note', body: 'Since Keeper is a practice project, it uses the local storage of your browser so, the data is stored on your machine and not on any remote server yet.', createdAt: new Date() },
        ]
        let savedItems;
        try {
            savedItems = JSON.parse(localStorage.getItem('keeperItems'));
            if (!savedItems) {
                localStorage.setItem('keeperItems', JSON.stringify(initStateItems));
                savedItems = initStateItems;
            }
        } catch (error) {
            console.log('ERROR OCCURED WHILE STATE INITIALIZATION');
        } finally {
            setStateItems(savedItems);
            setCheckingSavedItems(false);
        }
    }, [])

    useEffect(() => {
        var initTrash = [
            {
                id: Math.floor(Math.random() * 100000),
                body: "this is a deleted note",
                createdAt: new Date(),
                deletedAt: new Date(),
                title: "deleted note.",
                type: "note",
            }
        ];
        let trashItems;
        try {
            trashItems = JSON.parse(localStorage.getItem('keeperTrash'));
            if (!trashItems) {
                localStorage.setItem('keeperTrash', JSON.stringify(initTrash));
                trashItems = initTrash;
            }
        } catch (error) {
            console.log('ERROR OCCURED WHILE TRASH INITIALIZATION');
        } finally {
            setTrash(trashItems);
            setCheckingTrashStatus(false);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('keeperItems', JSON.stringify(stateItems));
    }, [stateItems])

    useEffect(() => {
        localStorage.setItem('keeperTrash', JSON.stringify(trash));
    }, [trash])

    const initiateNewItemAddition = (itemType) => {
        setNewItemType(itemType);
    }

    var newItem;

    const addNewItem = ({ itemType, item }) => {
        switch (itemType) {
            case 'note':
                newItem = {
                    id: Math.floor(Math.random() * 100000),
                    type: 'note',
                    title: item.title,
                    body: item.body,
                    createdAt: new Date()
                }
                break;
            case 'link':
                newItem = {
                    id: Math.floor(Math.random() * 100000),
                    type: 'link',
                    linkAddress: item.linkAddress,
                    createdAt: new Date()
                }
                break;
            case 'list':
                newItem = {
                    id: Math.floor(Math.random() * 100000),
                    type: 'list',
                    title: item.title,
                    listItems: item.listItems,
                    createdAt: new Date()
                }
                break;
            default:
                break;
        }

        try {
            setStateItems([newItem, ...stateItems])
            setNewItemType('');
            return (true);
        } catch (error) {
            return (false);
        }
    }

    const discardNewItem = () => {
        setNewItemType('');
    }

    const editItem = (item) => {
        setNewItemType('');
        setShowEditModal(true);
        setItemToEdit(item);
    }

    const cancelEditItem = () => {
        setShowEditModal(false);
    }

    const saveEditedItem = (item) => {
        try {
            var restOfList = stateItems.filter(x => x.id !== item.id);
            setStateItems([item, ...restOfList]);
            setItemToEdit();
            setShowEditModal(false);
            return (true);
        } catch (error) {
            return (false);
        }
    }

    const deleteItem = (item) => {
        var itemToDelete = stateItems.find(x => x.id === item.id);
        itemToDelete.deletedAt = new Date();

        var remaningItems = stateItems.filter(x => x.id !== item.id)
        setStateItems(remaningItems);

        if (trash.length > 0) {
            setTrash([itemToDelete, ...trash]);
        } else {
            setTrash([itemToDelete]);
        }
        setShowEditModal(false);
    }

    return (
        <GlobalStateContext.Provider value={{
            checkingSavedItems,
            stateItems,
            checkingTrashStatus,
            trash,
            setStateItems,
            newItemType,
            initiateNewItemAddition,
            addNewItem,
            discardNewItem,
            showEditModal,
            editItem,
            itemToEdit,
            cancelEditItem,
            saveEditedItem,
            deleteItem
        }} >
            {props.children}
        </GlobalStateContext.Provider>
    )
};