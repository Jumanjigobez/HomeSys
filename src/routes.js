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
    <BrowserRouter basename="/homesys">
      <Routes>
        <Route path='/' exact Component={Login}/>
       
        <Route path={LoggedIn ? '/home':'/'} exact Component={LoggedIn ? Home:Login}/>
    
        <Route path={LoggedIn ? '/todo':'/'} exact Component={LoggedIn ? Todo:Login}/>
        <Route path={LoggedIn ? '/timetables':'/'} exact Component={LoggedIn ? Timetables:Login}/>
        <Route path={LoggedIn ? '/timetables/personal':'/'} exact Component={LoggedIn ? Personal_Timetable:Login}/>
        <Route path={LoggedIn ? '/timetables/class':'/'} exact Component={LoggedIn ? Class_Timetable:Login}/>
        <Route path={LoggedIn ? '/projects':'/'} exact Component={LoggedIn ? Projects:Login}/>
        <Route path={LoggedIn ? '/contacts':'/'} exact Component={LoggedIn ? Contacts:Login}/>
        <Route path={LoggedIn ? '/appointments':'/'} exact Component={LoggedIn ? Appointments:Login}/>
        <Route path={LoggedIn ? '/payments':'/'} exact Component={LoggedIn ? Payments:Login}/>
        <Route path={LoggedIn ? '/events':'/'} exact Component={LoggedIn ? Events:Login}/>
        
        <Route path='*' Component={Login}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default MainRoutes;
