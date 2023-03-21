import { FormEvent, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { Complaint, getComplaints, updateComplaint } from "../../api/complaint-requests";
import { deleteMeeting, getMeetingById, updateMeeting } from "../../api/meeting-requests";
import { initialState, Meeting, MeetingReducer } from "../../reducer/meeting-reducer";
import { NavBar } from "../nav-bar";


export function EditMeetingForm() {

    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState<Meeting>();
    const [meetingState, dispatch] = useReducer(MeetingReducer, initialState);
    const numRows = 5;

    useEffect(() => {
        getMeetingById(Number(meetingId)).then((data) => setMeeting(data));
    }, [meetingId]);

    function handleDelete() {
        deleteMeeting(Number(meetingId));
    }

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            setComplaints(retrievedComplaints)
        })();
    }, []);


    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (meetingId) {
            let meeting: Meeting = {
                meetingId: parseInt(meetingId, 10),
                address: meetingState.address,
                summary: meetingState.summary,
                time: meetingState.time
            }
            updateMeeting(meeting);
        }
    }

    return <>
        <NavBar />
        <div className="pageContainer" style={{ flexDirection: 'row', marginLeft: '400px' }}>
            <div className="childDiv">
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                    {meeting &&
                        <ul>
                            <li> <h2>Edit Meeting</h2></li>
                            <li>
                                <label htmlFor="address">Address: </label>
                            </li>
                            <li>{meeting.address}</li>
                            <li>
                                <input id="address" type="text" onChange={e => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} required />
                            </li>
                            <br />

                            <li>
                                <label htmlFor="time">Time: </label>
                            </li>
                            <li>{(meeting.time).toString()}</li>
                            <li>
                                <input id="time" type="number" onChange={e => dispatch({ type: "SET_TIME", payload: Number(e.target.value)/ 1000 })} required />
                                <br />
                            </li>
                            <br />
                            <li>
                                <label htmlFor="summary">Summary: </label>
                            </li>
                            <li>{meeting.summary}</li>
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
                                <button type="submit">Update</button><button onClick={handleDelete} style={{ backgroundColor: 'red', marginLeft: '50px' }}>Delete</button>
                            </li>
                        </ul>
                    }
                </form>
            </div>
            <div className="childDiv">
                <h2>Complaints to be Addressed</h2>
                {meetingId &&
                    <table>
                        <tbody>
                            {complaints.filter(c => c.meetingId === Number(meetingId)).map(c =>
                                <tr key={c.complaintId}>
                                    <td>{c.description}</td>
                                    <td>{c.status}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
}