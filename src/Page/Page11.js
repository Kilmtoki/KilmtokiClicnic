import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Page.css';

function Page11() {
    const [symptoms, setSymptoms] = useState('');
    const [history, setHistory] = useState('');
    const [medication, setMedication] = useState('');
    const [drugAllergies, setDrugAllergies] = useState('');
    const [exercise, setExercise] = useState('');
    const [otherSymptoms, setOtherSymptoms] = useState('');
    const [impactOnDailyLife, setImpactOnDailyLife] = useState('');
    const [pastMedicalHistory, setPastMedicalHistory] = useState('');

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/data');
            // Destructure data from response
            const { ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8 } = response.data.answer;
            // Update state with fetched data
            setSymptoms(ans1);
            setHistory(ans2);
            setMedication(ans3);
            setDrugAllergies(ans4);
            setExercise(ans5);
            setOtherSymptoms(ans6);
            setImpactOnDailyLife(ans7);
            setPastMedicalHistory(ans8);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <header>สรุป</header>
            <div>
                <p1>อาการ</p1>
                <input className="small-input" type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page3"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p2>เป็นมา</p2>
                <input className="small-input" type="text" value={history} onChange={(e) => setHistory(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page4"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p3>ทานยา</p3>
                <input className="small-input" type="text" value={medication} onChange={(e) => setMedication(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page5"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p4>แพ้ยา</p4>
                <input className="small-input" type="text" value={drugAllergies} onChange={(e) => setDrugAllergies(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page6"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p5>ออกกำลังกาย</p5>
                <input className="small-input" type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page7"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p6>อาการอื่นๆ</p6>
                <input className="small-input" type="text" value={otherSymptoms} onChange={(e) => setOtherSymptoms(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page8"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p7>ส่งผลต่อชีวิตประจำวัน</p7>
                <input className="small-input" type="text" value={impactOnDailyLife} onChange={(e) => setImpactOnDailyLife(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page9"><button>แก้ไข</button></Link>
            </div>
            <div>
                <p8>เคยเป็นมาก่อน</p8>
                <input className="small-input" type="text" value={pastMedicalHistory} onChange={(e) => setPastMedicalHistory(e.target.value)} />
                <span className="button-gap"></span>
                <Link to="/page10"><button>แก้ไข</button></Link>
            </div>
            <div className="button-container">
                <Link to="/page12"><button>ถัดไป</button></Link>
            </div>
        </div>
    );
}

export default Page11;
