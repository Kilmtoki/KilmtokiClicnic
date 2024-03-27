import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import Keyboard from './Keyboard'; // Import Keyboard component
import axios from 'axios'; 

function Pagechoose4() {
    // Define state to store selected symptoms
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
    const [otherSymptom, setOtherSymptom] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const keyboardRef = useRef(null);

    useEffect(() => {
        // Add event listener to handle clicks outside the keyboard
        const handleClickOutside = (event) => {
            if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
                setShowKeyboard(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Function to handle symptom selection
    const handleSymptomSelect = (symptom) => {
        // Create a new Set based on the current selected symptoms
        const updatedSymptoms = new Set(selectedSymptoms);

        // Toggle selection status
        if (updatedSymptoms.has(symptom)) {
            updatedSymptoms.delete(symptom); // Remove symptom if already selected
            updatedSymptoms.delete(symptom);
        } else {
            updatedSymptoms.add(symptom); // Add symptom if not selected
            updatedSymptoms.add(symptom);
        }

        // Update the state with the new set of selected symptoms
        const updatedSymptomsString = Array.from(updatedSymptoms).join(", ");
        setOtherSymptom(updatedSymptomsString);

        setSelectedSymptoms(updatedSymptoms);

        if (symptom === "อื่นๆ,") {
            setShowKeyboard(true);
        } else {
            setShowKeyboard(false);
        }
    };


    // Function to handle confirmation
    // Function to handle confirmation
    const handleConfirm = () => {
        hideKeyboard(); 
        // Do something with selected symptoms
        console.log(otherSymptom); 
        
        // ส่งคำตอบ otherSymptom ไปยัง URL http://localhost:5000/answer
        axios.post('http://localhost:5000/answer', {
            ans2: otherSymptom
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Function to handle cancellation
    const handleCancel = () => {
        // Clear all selected symptoms
        setSelectedSymptoms(new Set());
        setOtherSymptom("");
    };

    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            setOtherSymptom(prevSymptom => prevSymptom.slice(0, -1));
        } else {
            setOtherSymptom(prevSymptom => prevSymptom + input);
        }
    };

    const hideKeyboard = () => {
        setShowKeyboard(false);
    };

    return (
        <div>
            <header>เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?</header>

            <div className="input-container">
            <input type="text" value={otherSymptom} onChange={(event) => handleInputChange(event.target.value)} />
            </div>
            <div className="button-container">
                <button onClick={() => handleSymptomSelect("แสดงอาการน้อยกว่า 7 วัน")} className={selectedSymptoms.has("แสดงอาการน้อยกว่า 7 วัน") ? "selected" : ""}>แสดงอาการน้อยกว่า 7 วัน</button>
                <span className="button-gap"></span>
                <button onClick={() => handleSymptomSelect("แสดงอาการมากกว่า 7 วัน")} className={selectedSymptoms.has("แสดงอาการมากกว่า 7 วัน") ? "selected" : ""}>แสดงอาการมากกว่า 7 วัน</button>
                <button onClick={() => handleSymptomSelect("อื่นๆ,")} className={selectedSymptoms.has("อื่นๆ,") ? "selected" : ""}>อื่นๆ</button>
                {showKeyboard && <button onClick={hideKeyboard}>ปิดคีย์บอร์ด</button>}
                {showKeyboard && <Keyboard handleKeyClick={handleInputChange} ref={keyboardRef} />}
                
            </div>
            <div className="button-container">
                <React.Fragment>
                    <button onClick={handleConfirm}>ยืนยัน</button>
                    <span className="button-gap"></span> 
                    <span className="button-gap"></span>
                    <button onClick={handleCancel}>ยกเลิก</button>
                    <span className="button-gap"></span>
                    <span className="button-gap"></span>
                    {selectedSymptoms.size > 0 && <Link to="/page5"><button>ถัดไป</button></Link>}
                </React.Fragment>
            </div>
        </div>
    );
}

export default Pagechoose4;

