import React from 'react';
import { AppUserMeetingList } from './components/app-user-meeting-list';
import { ComplaintForm } from './components/complaint-form';
import { ComplaintList } from './components/complaint-list';
import { MeetingForm } from './components/meeting-form';
import { MeetingList } from './components/meeting-list';

function App() {
  return <>
    <ComplaintForm />
    <ComplaintList />
    <MeetingForm />
    <MeetingList />
    <AppUserMeetingList />


  </>
}

export default App;
