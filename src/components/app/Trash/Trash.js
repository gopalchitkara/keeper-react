import React, { useContext, Fragment } from 'react'
import './Trash.css';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';
import { Row, Col, Empty } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import SavedNote from '../SavedItems/SavedNote';
import SavedLink from '../SavedItems/SavedLink';
import SavedList from '../SavedItems/SavedList';

function TrashItemToShow({ item }) {
    switch (item.type) {
        case 'note':
            return <SavedNote item={item} />;
        case 'link':
            return <SavedLink item={item} />;
        case 'list':
            return <SavedList item={item} />;
        default:
            return <></>
    }
}

function Trash() {
    const { trash, checkingTrashStatus } = useContext(GlobalStateContext);

    return (
        <div className="sidebar-offset navbar-offset">
            <div className="trash-container">
                {checkingTrashStatus ? (
                    <Row>
                        <Col xs={24} style={{ textAlign: "center", marginTop: 150 }}>
                            <LoadingOutlined style={{ fontSize: "2.4rem", }} />
                        </Col>
                    </Row>
                ) : (
                        <Fragment>
                            {trash && trash.length > 0 ? (
                                <div className="items-grid trash-grid">
                                    {trash.map(item => {
                                        return (
                                            <div className="grid-item trash-grid-item" key={item.id}>
                                                <div className="grid-item-content trash-grid-item-content">
                                                    <TrashItemToShow item={item} key={item.id} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                    <Row>
                                        <Col xs={24} style={{ textAlign: "center", marginTop: 150 }}>
                                            <Empty description={<span style={{ fontWeight: "bold" }}>Trash Empty</span>} />
                                        </Col>
                                    </Row>
                                )}
                        </Fragment>
                    )}
            </div>
        </div>
    )
}

export default Trash