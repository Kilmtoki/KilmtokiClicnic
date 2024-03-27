import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

function Page2({ userId }) {
    return (
        <div className="center-container">
            <p className="center-text">กรุณาเตรียมตอบคำถามต่อไปนี้ผ่านการพูดผ่านไมโครโฟนหรือแป้นพิมพ์</p>
                <Link to="/page3"><button>เริ่ม</button></Link>
        </div>
    );
}

export default Page2;
