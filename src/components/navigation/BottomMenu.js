import React from 'react'
import './BottomMenu.css'
import { Row, Col } from 'antd'
import {
    FileTextOutlined,
    ProfileOutlined,
    LinkOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import { useHistory } from 'react-router-dom'

function BottomMenu() {
    const { initiateNewItemAddition } = React.useContext(GlobalStateContext);

    const history = useHistory();

    const handleClick = (e, itemType) => {
        e.preventDefault();
        if (history.location.pathname !== '/') {
            history.push('/');
        }
        initiateNewItemAddition(itemType);
    }

    return (
        <Row className="bottom-menu" align="middle" >
            <Col xs={{ span: 3, offset: 1 }}>
                <div
                    className="sidebar-option hoverable-up"
                    onClick={(e) => handleClick(e, 'note')}
                >
                    <FileTextOutlined className="sidebar-options-icon" />
                    <p className="sidebar-option-title font-poppins m-0">Note</p>
                </div>
            </Col>
            <Col xs={3}>
                <div
                    className="sidebar-option hoverable-up"
                    onClick={(e) => handleClick(e, 'link')}
                >
                    <LinkOutlined className="sidebar-options-icon" />
                    <p className="sidebar-option-title font-poppins m-0" >Link</p>
                </div>
            </Col>
            <Col xs={3}>
                <div
                    className="sidebar-option hoverable-up"
                    onClick={(e) => handleClick(e, 'list')}
                >
                    <ProfileOutlined className="sidebar-options-icon" />
                    <p className="sidebar-option-title font-poppins m-0">List</p>
                </div>
            </Col>
            <Col xs={{ span: 3, offset: 10 }}>
                <div
                    className="sidebar-option"
                    onClick={() => { history.push('/trash') }}
                >
                    <DeleteOutlined className="sidebar-options-icon" />
                    <p className="sidebar-option-title font-poppins m-0">Trash</p>
                </div>
            </Col>
        </Row >
    )
}

export default BottomMenu
