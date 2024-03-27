import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

function Page12() {

    return (
        <div>
            <header>ขอบคุณที่ใช้บริการ</header>
            <div className="button-container">
                <Link to="/"><button>เสร็จสิ้น</button></Link>
            </div>
        </div>
    );
}

export default Page12;
