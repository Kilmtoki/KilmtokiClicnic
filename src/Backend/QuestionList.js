import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Page/Page.css';
import Keyboard2 from '../Page/Keyboard2.js'; // Importing Keyboard Component

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false); // State to determine whether to show keyboard
  const [inputType, setInputType] = useState(null); // State to store the input type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/question/get');
        const sortedQuestions = response.data.sort((a, b) => a.QuestionsNo - b.QuestionsNo);
        setQuestions(sortedQuestions);
        setTotalQuestions(sortedQuestions.length);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleInputChange1 = (input) => {
    if (input === 'Backspace') {
        setNumber(prevNumber => prevNumber.slice(0, -1));
    } else {
        setNumber(prevNumber => prevNumber + input);
    }
  }

  const handleInputChange2 = (input) => {
    if (input === 'Backspace') {
        setMessage(prevMessage => prevMessage.slice(0, -1));
    } else {
        setMessage(prevMessage => prevMessage + input);
    }
  }

  const handleDeleteQuestion = async (QuestionsNo) => {
    try {
      await axios.delete('http://127.0.0.1:5001/question/delete', { data: { QuestionsNo } });
      const updatedQuestions = questions.filter(question => question.QuestionsNo !== QuestionsNo);
      setQuestions(updatedQuestions);
      setTotalQuestions(updatedQuestions.length);
    } catch (error) {
      console.error('Error deleting questions:', error);
    }
  };

  const handleInsertUpdate = async () => {
    try {
      if (number && message) {
        await axios.post('http://127.0.0.1:5001/question/post', { QuestionsNo: number, Message: message });
        // โหลดข้อมูลหลังจากทำการส่งคำขอ POST เสร็จ
        const response = await axios.get('http://127.0.0.1:5001/question/get');
        const sortedQuestions = response.data.sort((a, b) => a.QuestionsNo - b.QuestionsNo);
        setQuestions(sortedQuestions);
        setTotalQuestions(sortedQuestions.length);
      }
    } catch (error) {
      console.error('Error inserting question:', error);
    }
    setNumber('');
    setMessage('');
    setShowKeyboard(false); // ซ่อนคีย์บอร์ดหลังจากส่งคำขอ
    setInputType(null); // รีเซ็ตประเภทของข้อมูลที่ป้อน
  };
  

  const handleKeyClickS = (inputType) => {
    setShowKeyboard(true); // Show the keyboard
    setInputType(inputType); // Set the input type
  };

  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>Questions List</header>
      <div style={{ textAlign: 'center' }}>
        <ul>
          {questions.map(question => (
            <div key={question._id} style={{ marginBottom: '10px' }}>
              <h5 style={{ display: 'inline-block', marginRight: '50px' }}>คำถามที่ {question.QuestionsNo}. {question.Message}</h5>
              <button onClick={() => handleDeleteQuestion(question.QuestionsNo)}>ลบ</button>
            </div>
          ))}
        </ul>
        <h4 style={{ marginTop: '20px' }}>จำนวนคำถามทั้งหมด: {totalQuestions}</h4>
        <div style={{ textAlign: 'center' }}>
          <header style={{ textAlign: 'center', marginBottom: '20px' }}>เพิ่มหรือแก้ไขคำถาม</header>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div>
              <label>กรอกหมายเลขคำถาม:         
              <input
                name="Number"
                type="text"
                placeholder='หมายเลขคำถาม'
                value={number}
                onClick={() => handleKeyClickS("Number")} // Pass the input type to the handler
                style={{ width: '1000px', height: '30px' }}
              /> </label>
            </div>
            <div>
            <label>กรอกคำถาม:         
              <input
                name="Message"
                type="text"
                placeholder='ข้อความ'
                value={message}
                onClick={() => handleKeyClickS("Message")} // Pass the input type to the handler
                style={{ width: '1000px', height: '30px' }}
              /> </label>
            </div>
            {showKeyboard && inputType && ( // Render the keyboard only when showKeyboard is true and inputType is set
              <Keyboard2 handleKeyClick={inputType === 'Number' ? handleInputChange1 : handleInputChange2} />
            )}
            <button onClick={handleInsertUpdate} style={{ marginTop: '10px' }}>ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
