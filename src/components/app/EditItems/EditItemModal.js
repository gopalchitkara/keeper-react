import React from 'react'
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
    } = React.useContext(GlobalStateContext);

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
            {itemToEdit && itemToEdit.id && (
                <AnimatePresence exitBeforeEnter>
                    {showEditModal && (
                        <motion.div className="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2, type: "tween" }}
                                key={Math.random()}
                            >
                                <Row style={{ marginTop: 100 }} justify="center" >
                                    <Col xs={24} sm={20} md={18} lg={14} xl={12} className="pt-20 pb-20">
                                        <ToggleItemToEdit toggleType={itemToEdit.type} />
                                    </Col>
                                </Row>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )
            }
        </div >
    )
}

export default EditItemModal