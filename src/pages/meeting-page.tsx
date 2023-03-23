import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Complaint, getComplaints } from "../api/complaint-requests";
import { getMeetingById } from "../api/meeting-requests";
import { NavBar } from "../components/nav-bar";
import { Meeting } from "../reducer/meeting-reducer";


export function MeetingPage() {

    const { meetingId } = useParams<{ meetingId: string }>();
    const [meeting, setMeeting] = useState<Meeting>();
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        getMeetingById(Number(meetingId)).then((data) => setMeeting(data));
    }, [meetingId]);

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            setComplaints(retrievedComplaints)
        })();
    }, []);

    return <>
        <NavBar />
        <div className="pageContainer">
            <div style={{ textAlign: 'left', paddingTop: '40px', width: '1100px' }}>
                <Link to='/home'>
                    <button>← Back</button>
                </Link>
            </div>
            <div style={{ flexDirection: 'row' }}>
                <div className="childDiv" style={{ width: '400px', minHeight: '300px' }}>
                    {meeting &&
                        <div>
                            <h2>Meetings details</h2>
                            <ul>
                                <li style={{ marginBottom: '10px' }}>Summary: </li>
                                <li key={meeting.meetingId}>{meeting.summary}</li>
                                <br />
                                <li style={{ marginBottom: '10px' }}>When: </li>
                                <li key={meeting.meetingId}>{new Date(meeting.time * 1000).toString()}</li>
                                <br />
                                <li style={{ marginBottom: '10px' }}>Where: </li>
                                <li key={meeting.meetingId}>{meeting.address}</li>
                            </ul>
                        </div>
                    }
                </div>
                <div className="childDiv" style={{ minHeight: '350px' }}>
                    <h2>Complaints to be addressed</h2>
                    {complaints.filter(c => c.meetingId === Number(meetingId)).map(c =>
                        <ul>
                            <li key={c.complaintId}>{c.description}</li>
                        </ul>)
                    }
                </div>
            </div>
        </div>
    </>
}