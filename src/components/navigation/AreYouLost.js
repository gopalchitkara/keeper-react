import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function AreYouLost() {
    return (
        <div style={{ marginTop: 50 }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
            />
        </div>
    )
}

export default AreYouLost
