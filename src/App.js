import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Page1 from './Page/Page1.js';
import Page2 from './Page/Page2.js';
import Page3 from './Page/Page3.js';
import Page4 from './Page/Page4.js';
import Page5 from './Page/Page5.js';
import Page6 from './Page/Page6.js';
import Page7 from './Page/Page7.js';
import Page8 from './Page/Page8.js';
import Page9 from './Page/Page9.js';
import Page10 from './Page/Page10.js';
import Page11 from './Page/Page11.js';
import Page12 from './Page/Page12.js';
import Page13 from './Page/Page13.js';
import Page14 from './Page/Page14.js';
import Pagekey from './Page/Keyboardpage.js';

import Pagechoose3 from './Page/choosepage3.js'
import Pagechoose4 from './Page/choosepage4.js'
import Pagechoose5 from './Page/choosepage5.js'
import Pagechoose6 from './Page/choosepage6.js'
import Pagechoose7 from './Page/choosepage7.js';
import Pagechoose8 from './Page/choosepage8.js';
import Pagechoose9 from './Page/choosepage9.js';
import Pagechoose10 from './Page/choosepage10.js';
import UserList from './Backend/UserList.js';
import QuestionList from './Backend/QuestionList.js';
import Addmin from './Backend/Addmin.js';

function App() {
  return (
    <Router basename={'/WEBAI'}>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/page1' element={<Page1 />} /> 
        <Route path='/page2' element={<Page2/>} />
        <Route path='/page3' element={<Page3/>} />
        <Route path='/page4' element={<Page4/>} />
        <Route path='/page5' element={<Page5/>} />
        <Route path='/page6' element={<Page6/>} />
        <Route path='/page7' element={<Page7/>} />
        <Route path='/page8' element={<Page8/>} />
        <Route path='/page9' element={<Page9/>} />
        <Route path='/page10' element={<Page10/>} />
        <Route path='/page11' element={<Page11/>} />
        <Route path='/page12' element={<Page12/>} />
        <Route path='/page13' element={<Page13/>} />
        <Route path='/page14' element={<Page14/>} />
        <Route path='/Pagekey' element={<Pagekey/>} />
        <Route path='/choosepage3' element={<Pagechoose3/>} />
        <Route path='/choosepage4' element={<Pagechoose4/>} />
        <Route path='/choosepage5' element={<Pagechoose5/>} />
        <Route path='/choosepage6' element={<Pagechoose6/>} />
        <Route path='/choosepage7' element={<Pagechoose7/>} />
        <Route path='/choosepage8' element={<Pagechoose8/>} />
        <Route path='/choosepage9' element={<Pagechoose9/>} />
        <Route path='/choosepage10' element={<Pagechoose10/>} />
        <Route path="userlist" element={<UserList />} />
        <Route path="questionlist" element={<QuestionList />} />
        <Route path="addmin" element={<Addmin />} />
      </Routes>
    </Router>
  );
}

export default App;