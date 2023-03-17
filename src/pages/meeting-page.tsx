import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Complaint } from "../api/complaint-requests";
import { getMeetingById } from "../api/meeting-requests";
import { Meeting } from "../reducer/meeting-reducer";


export function MeetingPage() {

    const { meetingId } = useParams<{ meetingId: string }>();
    const [meeting, setMeeting] = useState<Meeting>();
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        getMeetingById(Number(meetingId)).then((data) => setMeeting(data));
    }, [meetingId]);

    return <>
        {meeting &&
            <div>
                <h2>Meetings details</h2>
                <ul>
                    <li key={meeting.meetingId}>{meeting.summary}</li>
                    <li key={meeting.meetingId}>{meeting.time}</li>
                    <li key={meeting.meetingId}>{meeting.address}</li>
                </ul>
                <h2>Complaints to be addressed</h2>
                <ul>
                    {/* <li key={complaint.id}>{complaints.description}</li> */}
                </ul>
            </div>
        }
    </>
}