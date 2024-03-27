// Page1.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Keyboard from './Keyboard'; // แก้ชื่อไฟล์จาก key.js เป็น keyboard.js
import './form.css';

function Page1() {
    const [userId, setUserId] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handleInputChange = (input) => {
        setUserId(input);
        console.log(input);
    };

    const handleKeyClick = (input) => {
        setUserId((prevUserId) => prevUserId + input);
    };

    const toggleKeyboard = () => {
        setIsKeyboardVisible(!isKeyboardVisible);
    };

    return (
        <div>
            <header style={{ textAlign: 'center' }}>หมายเลขบัตรประชาชน</header>
            
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onFocus={toggleKeyboard}
                onBlur={toggleKeyboard}
            />
            {isKeyboardVisible && <Keyboard handleKeyClick={handleKeyClick} />}

            <div className="button-container">
             <Link to="/page2"><button>ยืนยัน</button></Link>  
            </div>
        </div>
    );
}

export default Page1;
