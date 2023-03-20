import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Complaint, getComplaints } from "../api/complaint-requests";
import { getMeetingById } from "../api/meeting-requests";
import { NavBar } from "../components/nav-bar";
import { Meeting } from "../reducer/meeting-reducer";


export function MeetingPage() {

    const { meetingId } = useParams<{ meetingId: string }>();
    const [meeting, setMeeting] = useState<Meeting>();
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    // const date = new Date(meeting.time * 1000);


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
        <div className="pageContainer" style={{ flexDirection: 'row', marginLeft: '500px' }}>
            <div className="childDiv">
                {meeting &&
                    <div>
                        <h2>Meetings details</h2>
                        <ul>
                            <li>Summary: </li>
                            <li key={meeting.meetingId}>{meeting.summary}</li>
                            <br />
                            <li>When: </li>
                            <li key={meeting.meetingId}>{meeting.time}</li>
                            <br />
                            <li>Where: </li>
                            <li key={meeting.meetingId}>{meeting.address}</li>
                        </ul>
                    </div>
                }
            </div>
            <div className="childDiv">
                <h2>Complaints to be addressed</h2>
                {complaints.filter(c => c.meetingId === Number(meetingId)).map(c =>
                    <ul>
                        <li key={c.complaintId}>{c.description}</li>
                    </ul>)
                }
            </div>
        </div>
    </>
}