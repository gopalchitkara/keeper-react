import React, { useContext } from 'react'
import './Navbar.css'
import { Row, Col, Breadcrumb, Typography, Dropdown, Menu } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons'
import { GlobalStateContext } from '../../contexts/GlobalStateContext';

const { Text } = Typography;


const menu = ({ isDraggingGlobal, setIsDraggingGlobal, resetToOriginalState }) => {
    return (
        <Menu style={{ marginTop: 5, padding: 5 }}>
            <Menu.Item style={{ padding: "10px 10px" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.gopalchitkara.in/">
                    Contact Me
        </a>
            </Menu.Item>
            <Menu.Item style={{ padding: "10px 10px" }}>
                <Link to="#" onClick={() => { setIsDraggingGlobal(!isDraggingGlobal) }}>
                    {isDraggingGlobal ? 'Disable' : 'Enable'} Drag and Drop.
                </Link>
            </Menu.Item>
            <Menu.Item style={{ padding: "10px 10px" }}>
                <Link to="#" onClick={() => { resetToOriginalState() }}>
                    Reset to original Content.
                </Link>
            </Menu.Item>
        </Menu>
    )
};

function Navbar() {

    const {
        isDraggingGlobal,
        setIsDraggingGlobal,
        resetToOriginalState
    } = useContext(GlobalStateContext);

    return (
        <Row align="middle" className="navbar">
            <Col xs={22} lg={23} className="pl-20 pr-20">
                <Row align="middle" >
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/'>
                                <HomeFilled /> <Text strong className="font-poppins">Keeper Notes</Text>
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
            </Col>
            <Col xs={1}>
                <Dropdown overlay={menu({ isDraggingGlobal, setIsDraggingGlobal, resetToOriginalState })} placement="bottomRight"
                    trigger={['click']}
                >
                    <SettingOutlined style={{ fontSize: "1.4rem" }} />
                </Dropdown>
            </Col>
        </Row>
    )
}

export default Navbar
