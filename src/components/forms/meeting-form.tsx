import { FormEvent, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Complaint, getComplaints } from "../../api/complaint-requests";
import { createMeeting } from "../../api/meeting-requests";
import { initialState, MeetingReducer } from "../../reducer/meeting-reducer";
import { NavBar } from "../nav-bar";

export type MeetingInputs = {
    address: string,
    summary: string,
    time: number
}

export function MeetingForm() {

    const navigate = useNavigate();
    const [meetingState, dispatch] = useReducer(MeetingReducer, initialState);
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    const numRows = 3;

    async function submitData(event: FormEvent<HTMLFormElement>) {
        let meeting: MeetingInputs = { address: "", summary: "", time: 0 };
        meeting.address = meetingState.address;
        meeting.summary = meetingState.summary;
        meeting.time = meetingState.time;

        createMeeting(meeting);
        navigate('/appuserhome');
    }

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            setComplaints(retrievedComplaints)
        })();
    }, []);

    return <>
        <NavBar />
        <div className="pageContainer" style={{ flexDirection: 'row', marginLeft: '400px' }}>
            <div className="childDiv">
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                    <ul>
                        <li>
                            <h2>Create a Meeting</h2>
                        </li>
                        <li>
                            <label htmlFor="summary">Summary</label>
                        </li>
                        <li>
                            <textarea
                                id="summary"
                                name="summary"
                                rows={numRows}
                                onChange={e => dispatch({ type: "SET_SUMMARY", payload: e.target.value })}
                                required
                            />
                        </li>
                        <br />
                        <li>
                            <label htmlFor="address">Address</label>
                        </li>
                        <li>
                            <input id="address" type="text" onChange={e => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} required />
                        </li>
                        <br />
                        <li>
                            <label htmlFor="time">Time</label>
                        </li>
                        <li>
                            <input id="time" type="number" onChange={e => dispatch({ type: "SET_TIME", payload: Number(e.target.value) })} required />
                        </li>
                        <br />
                        <li>
                            <button type="submit">Create</button>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="childDiv">
                <h2>Complaints</h2>
                <table>
                    <tbody>
                        {complaints.filter(c =>
                            c.status.includes("LOW PRIORITY") ||
                            c.status.includes("HIGH PRIORITY")
                            && c.meetingId == 0).map(c =>
                                <tr key={c.complaintId}>
                                    <td>{c.description}</td>
                                    <td>{c.status}</td>
                                </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}