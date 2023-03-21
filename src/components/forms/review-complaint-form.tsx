import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Complaint, getComplaintById, updateComplaint } from "../../api/complaint-requests";
import { getMeetings } from "../../api/meeting-requests";
import { Meeting } from "../../reducer/meeting-reducer";
import { NavBar } from "../nav-bar";


export function ReviewComplaintForm() {

    const { complaintId } = useParams();
    const [complaint, setComplaint] = useState<Complaint>();
    const [status, setStatus] = useState<string>("");
    const [meetingId, setMeetingId] = useState<number>(0);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [meetingVisibility, setMeetingVisibility] = useState<boolean>(false);



    const navigate = useNavigate();

    useEffect(() => {
        getComplaintById(Number(complaintId)).then((data) => setComplaint(data));
    }, [complaintId]);

    useEffect(() => {
        (async () => {
            const retrievedMeetings = await getMeetings();
            setMeetings(retrievedMeetings)
        })();
    }, []);



    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (complaint) {
            const updatedComplaint = { ...complaint, status: status, meetingId: meetingId };
            await updateComplaint(updatedComplaint);
            setComplaint(updatedComplaint);
            navigate('/appuserhome');
        }
    }

    return <>
        <NavBar />
        <div className="pageContainer" style={{ flexDirection: 'row', marginLeft: '200px' }}>
            <form onSubmit={handleSubmit}>
                <div className="childDiv">
                    <h2>Complaint:</h2>
                    {complaint &&
                        <li>{complaint.description}</li>
                    }
                </div>
                <div className="childDiv">
                    <ul>
                        <li>
                            <h2>Status</h2>
                        </li>
                        <li>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="status" value="HIGH PRIORITY" onChange={(e) => { setStatus(e.target.value); setMeetingVisibility(true) }} />
                                HIGH PRIORITY
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="status" value="LOW PRIORITY" onChange={(e) => { setStatus(e.target.value); setMeetingVisibility(true) }} />
                                LOW PRIORITY
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="status" value="IGNORED" onChange={(e) => { setStatus(e.target.value); setMeetingVisibility(false) }} />
                                IGNORED
                            </label>
                        </li>
                    </ul>

                </div>
                {meetingVisibility &&
                    <><div className="childDiv">
                        <h2>Attach Complaint to Meeting</h2>
                        <ul>
                            {meetings.map(m => <tr key={m.meetingId}>
                                {/* <td>{m.meetingId}</td> */}
                                <li><input name="meetingId" type="radio" value={m.meetingId} onChange={(e) => setMeetingId(Number(e.target.value))} />{m.summary}</li>
                            </tr>)}
                        </ul>
                    </div>
                        {/* <div className="childDiv">
                            <h2>Assign complaint to meeting</h2>
                            <input type="number" onChange={(e) => setMeetingId(Number(e.target.value))} placeholder="Enter meeting ID #" />
                        </div> */}
                    </>
                }
                <button type="submit" style={{ margin: '0px' }}>Set</button>
            </form>
        </div>
    </>
}
