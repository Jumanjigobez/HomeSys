import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/login';
import Home from './components/home';
import Todo from './components/todo';
import Timetables from './components/timetables';
import Personal_Timetable from './components/personal_timetable';
import Class_Timetable from './components/class_timetable';
import Projects from './components/projects';
import Contacts from './components/contacts';
import Appointments from './components/appointments'
import Payments from './components/payments';
import Events from './components/events';

const MainRoutes = () =>{
  //Check if user already logged in inorder to route to required page
  const LoggedIn = localStorage.length!==0 && 
      JSON.parse(localStorage.getItem("sessions")).username!==""? true : false
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={Login}/>
       
        <Route path={LoggedIn ? '/home':'/'} exact element={LoggedIn ? Home:Login}/>
    
        <Route path={LoggedIn ? '/todo':'/'} exact element={LoggedIn ? Todo:Login}/>
        <Route path={LoggedIn ? '/timetables':'/'} exact element={LoggedIn ? Timetables:Login}/>
        <Route path={LoggedIn ? '/timetables/personal':'/'} exact element={LoggedIn ? Personal_Timetable:Login}/>
        <Route path={LoggedIn ? '/timetables/class':'/'} exact element={LoggedIn ? Class_Timetable:Login}/>
        <Route path={LoggedIn ? '/projects':'/'} exact element={LoggedIn ? Projects:Login}/>
        <Route path={LoggedIn ? '/contacts':'/'} exact element={LoggedIn ? Contacts:Login}/>
        <Route path={LoggedIn ? '/appointments':'/'} exact element={LoggedIn ? Appointments:Login}/>
        <Route path={LoggedIn ? '/payments':'/'} exact element={LoggedIn ? Payments:Login}/>
        <Route path={LoggedIn ? '/events':'/'} exact element={LoggedIn ? Events:Login}/>
        
        <Route path='*' element={Login}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default MainRoutes;
