import React from 'react';
import { Link } from 'react-router-dom';
import '../Page/Page.css';

function Admin({ userId }) {
    return (
        <div>
            <header style={{ textAlign: 'center' }}>กรุณาเลือกฟังก์ชั่นที่ต้องการ</header>
            <div style={{ textAlign: 'center' }}>
                <Link to="/userlist"><button style={{ marginRight: '10px' }}>UserList</button></Link>
                <Link to="/questionlist"><button>QuestionList</button></Link>
            </div>
        </div>
    );
}

export default Admin;
