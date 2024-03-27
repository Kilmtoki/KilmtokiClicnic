import React, { useState } from 'react';
import Keyboard from './Keyboard'; // เรียกใช้ Component ของคีย์บอร์ด
import './form.css';
import './Page.css';
import axios from 'axios'; 
function Page1() {
    const [userId, setUserId] = useState(''); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้

    // เมื่อมีการเปลี่ยนแปลงใน userId ให้แสดงผลลัพธ์
    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            // Remove the last character from the userId
            setUserId(userId => userId.slice(0, -1));
        } else {
            // Concatenate the input with the current userId and update the state
            setUserId(userId => userId + input);
        }
        // console.log(userId)
    };

    //API
    const handleConfirm = () => {
        if(userId==="แอดมิน"){
          alert('ยินดีต้อนรับเจ้าหน้าที่เข้าสู่ระบบ')
          axios.post('http://localhost:5000/users/post',{
            PID: userId,
          })
            .then(response => {
              console.log('Response:', response.data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
          
          window.location = './addmin'
        }
        else if (/^\d{13}$/.test(userId)) {
          axios.post('http://localhost:5000/users/post',{
            PID: userId,
          })
            .then(response => {
              console.log('Response:', response.data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
            alert('ยินดีต้อนรับเข้าสู่ระบบ')
            window.location = './page2'
        } else {
            alert('กรุณากรอกเลขบัตรประจำตัว 13 หลักให้ถูกต้อง')
        }
      };
    



    return (
        <div>
            <header style={{ textAlign: 'center' }}>หมายเลขบัตรประชาชน</header>
            <div className="input-container">
            <input
                type="text"
                value={userId}
            /> 
            </div>
            <div className="center-container">
               <button onClick={handleConfirm}>ยืนยัน</button>
               <Keyboard handleKeyClick={handleInputChange} />   
            </div>
        </div>
    );
}

export default Page1;
