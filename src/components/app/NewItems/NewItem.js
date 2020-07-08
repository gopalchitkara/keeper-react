import React, { useContext } from 'react'
import { GlobalStateContext } from '../../../contexts/GlobalStateContext'
import NewNote from './NewNote';
import NewLink from './NewLink';
import NewList from './NewList';
import './NewItem.css'
import { Row, Col } from 'antd';
import { AnimatePresence } from 'framer-motion';

function NewItem() {

    const { newItemType } = useContext(GlobalStateContext);

    function ToggleNewItems({ toggleType }) {
        switch (toggleType) {
            case 'note':
                return <NewNote />
            case 'link':
                return <NewLink />
            case 'list':
                return <NewList />
            default:
                return <></>
        }
    }

    return (
        <Row justify="center" className="new-item-wrapper">
            {newItemType ? (
                <Col xs={24} sm={20} md={18} lg={14} xl={12} className="pt-20 pb-20">
                    <div style={{ minHeight: 150 }}>
                        <AnimatePresence exitBeforeEnter>
                            <ToggleNewItems toggleType={newItemType} key={Math.random()} />
                        </AnimatePresence>
                    </div>
                </Col>
            ) : (
                    <></>
                )}
        </Row>
    )
}

export default NewItem
