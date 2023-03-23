import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMeetings } from "../../api/meeting-requests";
import { Meeting } from "../../reducer/meeting-reducer";

export function AppUserMeetingList() {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedMeetings = await getMeetings();
            setMeetings(retrievedMeetings)
        })();
    }, []);

    return <>
        <h2 style={{ textAlign: 'center' }}>
            Meetings ( {meetings.length} ) <Link to='/meetingform'>
                <button id="addMeetingBtn">+</button></Link></h2>
        <table style={{ margin: '0px auto' }}>
            <tbody>
                {meetings.map(m =>
                    <tr key={m.meetingId}>
                        <td>{m.summary}</td>
                        <td><Link to={`/editmeeting/${m.meetingId}`}><button>Edit</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}