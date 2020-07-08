import React from 'react'
import './Navbar.css'
import { Row, Col, Breadcrumb, Typography } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

function Navbar() {
    return (
        <Row align="middle" className="navbar">
            <Col xs={24} className="pl-20 pr-20">
                <Row align="middle" >
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/'>
                                <HomeFilled /> <Text strong>Keeper Notes</Text>
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
            </Col>
        </Row>
    )
}

export default Navbar
