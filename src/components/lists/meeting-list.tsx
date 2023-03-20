import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMeetings } from "../../api/meeting-requests";
import { Meeting } from "../../reducer/meeting-reducer";

export function MeetingList() {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedMeetings = await getMeetings();
            setMeetings(retrievedMeetings)
        })();
    }, []);

    return <>
        <h2>Meetings ( {meetings.length} )</h2>
        <table>
            <tbody>
                {meetings.map(m =>
                    <tr key={m.meetingId}>
                        <td>{m.summary}</td>
                        {/* clicking on view will direct user to specific meeting page where it will show details: address and time */}
                        {/* <td>{m.time}</td>
                        <td>{m.address}</td> */}
                        <td><Link to={`/meeting/${m.meetingId}`}><button>View</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}