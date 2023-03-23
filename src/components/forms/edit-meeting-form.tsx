import { FormEvent, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Complaint, getComplaints } from "../../api/complaint-requests";
import { deleteMeeting, getMeetingById, updateMeeting } from "../../api/meeting-requests";
import { initialState, Meeting, MeetingReducer } from "../../reducer/meeting-reducer";
import { NavBar } from "../nav-bar";


export function EditMeetingForm() {

    const navigate = useNavigate();

    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState<Meeting>();
    const [meetingState, dispatch] = useReducer(MeetingReducer, initialState);
    const numRows = 7;

    useEffect(() => {
        getMeetingById(Number(meetingId)).then((data) => setMeeting(data));
    }, [meetingId]);

    function handleDelete() {
        deleteMeeting(Number(meetingId));
        alert('Meeting deleted')
        navigate('/appuserhome');
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
        alert('Meeting updated')
        navigate('/appuserhome');
    }

    return <>
        <NavBar />
        <div className="pageContainer">
            <div style={{ textAlign: 'left', paddingTop: '40px', width: '1100px' }}>
                <Link to='/appuserhome'>
                    <button>← Back</button>
                </Link>
            </div>
            <div style={{ flexDirection: 'row' }}>
                <div className="childDiv" style={{width: '400px'}}>
                    <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                        {meeting &&
                            <ul>
                                <li> <h2>Edit Meeting</h2></li>
                                <li style={{ marginBottom: '10px' }}>
                                    <label htmlFor="address">Address: </label>
                                </li>
                                <li>{meeting.address}</li>
                                <li>
                                    <input id="address" type="text" onChange={e => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} required/>
                                </li>
                                <br />

                                <li style={{ marginBottom: '10px' }}>
                                    <label htmlFor="time">Time: </label>
                                </li>
                                <li>{new Date(meeting.time * 1000).toString()}</li>
                                <li>
                                <input id="time" type='datetime-local' onChange={e => dispatch({ type: "SET_TIME", payload: ((Date.parse(e.target.value)) / 1000) })} />
                                    <br />
                                </li>
                                <br />
                                <li style={{ marginBottom: '10px' }}>
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
                                    <button type="submit">Update</button><button onClick={handleDelete} className="deleteBtn" style={{ marginLeft: '100px' }}>Delete</button>
                                </li>
                            </ul>
                        }
                    </form>
                </div>
                <div className="childDiv" style={{ minHeight: '600px' }}>
                    <h2>Complaints to be Addressed</h2>
                    {meetingId &&
                        <table>
                            <tbody>
                                {complaints.filter(c => c.meetingId === Number(meetingId)).map(c =>
                                    <tr key={c.complaintId}>
                                        <td style={{ paddingLeft: '0px' }}>{c.description}</td>
                                        <td>{c.status}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    </>
}