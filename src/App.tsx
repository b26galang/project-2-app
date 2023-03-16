import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppUserMeetingList } from './components/lists/app-user-meeting-list';
import { ComplaintForm } from './components/forms/complaint-form';
import { ComplaintList } from './components/lists/complaint-list';
import { HomePage } from './pages/guest-home-page';
import { LoginPage } from './components/login-page';
import { MeetingForm } from './components/forms/meeting-form';
import { MeetingList } from './components/lists/meeting-list';
import { ReviewComplaintForm } from './components/forms/review-complaint-form';
import "./style/styles.css";
import { AppUserHomePage } from './pages/app-user-home-page';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/appuserhome' element={<AppUserHomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/complaintform' element={<ComplaintForm />} />
        <Route path='/complaint/:complaintId' element={<ReviewComplaintForm />} />
        <Route path='/complaints' element={<ComplaintList />} />
        <Route path='/meetingform' element={<MeetingForm />} />
        <Route path='/meetings' element={<MeetingList />} />
        <Route path='/appusermeetings' element={<AppUserMeetingList />} />
      </Routes>
    </BrowserRouter>



  </>
}

export default App;
