import { useEffect, useState } from "react";
import { getMeetings, Meeting } from "../api/meeting-requests";

export function MeetingList() {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedMeetings = await getMeetings();
            setMeetings(retrievedMeetings)
        })();
    }, []);

    return <>
        <h2>Meetings</h2>
        <table>
            <tbody>
                {meetings.map(m =>
                    <tr key={m.meetingId}>
                        <td>{m.summary}</td>
                        {/* clicking on view will direct user to specific meeting page where it will show details: address and time */}
                        {/* <td>{m.time}</td>
                        <td>{m.address}</td> */}
                        <td><button>View</button></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}