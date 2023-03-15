import { useState, useEffect } from "react";
import { Meeting, getMeetings } from "../api/meeting-requests";

export function AppUserMeetingList() {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedMeetings = await getMeetings();
            setMeetings(retrievedMeetings)
        })();
    }, []);

    return <>
    <h1>App User Meeting View</h1>
        <h2>Meetings</h2>
        <h3>Add a New Meeting</h3>
        <button>Add</button>
        <table>
            <tbody>
                {meetings.map(m =>
                    <tr key={m.meetingId}>
                        <td>{m.summary}</td>
                        <td><button>View</button></td>
                        {/* <td>{m.time}</td>
                        <td>{m.address}</td> */}
                        {/* <td><button>Edit</button></td>
                        <td><button>Delete</button></td> */}
                    </tr>)}
            </tbody>
        </table>
    </>
}