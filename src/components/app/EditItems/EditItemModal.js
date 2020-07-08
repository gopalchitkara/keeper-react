import React, { useContext } from 'react'
import { GlobalStateContext } from '../../../contexts/GlobalStateContext'
import { AnimatePresence, motion } from 'framer-motion';
import './EditItemModal.css';
import EditNote from './EditNote';
import EditLink from './EditLink';
import EditList from './EditList';
import { Row, Col } from 'antd';


function EditItemModal() {
    const {
        showEditModal,
        itemToEdit,
        cancelEditItem,
        saveEditedItem,
        deleteItem
    } = useContext(GlobalStateContext);

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    function ToggleItemToEdit({ toggleType }) {
        switch (toggleType) {
            case 'note':
                return <EditNote
                    note={itemToEdit}
                    cancelEditItem={cancelEditItem}
                    saveEditedItem={saveEditedItem}
                    deleteItem={deleteItem}
                />
            case 'link':
                return <EditLink
                    link={itemToEdit}
                    cancelEditItem={cancelEditItem}
                    saveEditedItem={saveEditedItem}
                    deleteItem={deleteItem}
                />
            case 'list':
                return <EditList
                    existingList={itemToEdit}
                    cancelEditItem={cancelEditItem}
                    saveEditedItem={saveEditedItem}
                    deleteItem={deleteItem}
                />
            default:
                return <></>
        }
    }

    return (
        <div>
            {itemToEdit && itemToEdit.id ? (
                <AnimatePresence exitBeforeEnter>
                    {showEditModal ? (
                        <motion.div className="backdrop"
                            variants={backdrop}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.div
                                initial={{ y: -500 }}
                                animate={{ y: 0 }}
                                exit={{ y: -500 }}
                            >
                                <Row style={{ marginTop: 100 }} justify="center" >
                                    <Col xs={24} sm={20} md={18} lg={14} xl={12} className="pt-20 pb-20">
                                        <ToggleItemToEdit toggleType={itemToEdit.type} key={Math.random()} />
                                    </Col>
                                </Row>
                            </motion.div>
                        </motion.div>
                    ) : (<></>)}
                </AnimatePresence>
            ) : (<></>)
            }
        </div >
    )
}

export default EditItemModal