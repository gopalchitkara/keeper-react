import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Sidebar.css'
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import { Row, Col } from 'antd';
import {
    FileTextOutlined,
    ProfileOutlined,
    LinkOutlined,
    DeleteOutlined
} from '@ant-design/icons'

function Sidebar() {
    const { initiateNewItemAddition } = useContext(GlobalStateContext);

    const history = useHistory();

    const handleClick = (e, itemType) => {
        e.preventDefault();
        if (history.location.pathname !== '/') {
            history.push('/');
        }
        initiateNewItemAddition(itemType);
    }

    return (
        <div className="sidebar">
            <Row style={{ height: "90%", padding: "15px 5px" }}>
                <Col xs={24}>
                    <Row>
                        <Col xs={24}>
                            <Row align="center">
                                <div
                                    className="sidebar-option hoverable"
                                    onClick={(e) => handleClick(e, 'note')}
                                >
                                    <FileTextOutlined className="sidebar-options-icon" />
                                    <p className="sidebar-option-title font-poppins">Note</p>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={24}>
                            <Row align="center">
                                <div
                                    className="sidebar-option hoverable"
                                    onClick={(e) => handleClick(e, 'link')}
                                >
                                    <LinkOutlined className="sidebar-options-icon" />
                                    <p className="sidebar-option-title font-poppins">Link</p>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={24}>
                            <Row align="center">
                                <div
                                    className="sidebar-option hoverable"
                                    onClick={(e) => handleClick(e, 'list')}
                                >
                                    <ProfileOutlined className="sidebar-options-icon" />
                                    <p className="sidebar-option-title font-poppins">List</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} style={{ alignSelf: "flex-end" }}>
                    <Row>
                        <Col xs={24}>
                            <Row align="center">
                                <div
                                    className="sidebar-option"
                                    onClick={() => { history.push('/trash') }}
                                >
                                    <DeleteOutlined className="sidebar-options-icon" />
                                    <p className="sidebar-option-title font-poppins">Trash</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Sidebar
