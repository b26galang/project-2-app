import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
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
            alert('Complaint updated')
            navigate('/appuserhome');
        }
    }

    return <>
        <NavBar />

        <form onSubmit={handleSubmit}>
            <div className="pageContainer" style={{ flexDirection: 'row', marginLeft: '400px' }}>
                <div className="childDiv">
                    <h2>Complaint:</h2>
                    {complaint &&
                        <li>{complaint.description}</li>
                    }
                    <div>
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
                                    <input type="radio" name="status" value="IGNORED" onChange={(e) => { setStatus(e.target.value); setMeetingId(0); setMeetingVisibility(false) }} />
                                    IGNORED
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                {meetingVisibility &&
                    <><div className="childDiv">
                        <h2>Attach Complaint to Meeting</h2>
                        <ul>
                            {meetings.map(m => <tr key={m.meetingId}>
                                <li><input name="meetingId" type="radio" value={m.meetingId} onChange={(e) => setMeetingId(Number(e.target.value))} />{m.summary}</li>
                            </tr>)}
                        </ul>
                    </div>
                    </>
                }
            </div>
            <button type="submit" style={{ marginLeft: '700px'}}>Set</button>
            <Link to={'/appuserhome'}><button type="submit" style={{ marginLeft: '200px'}}>Cancel</button></Link>
        </form>
    </>
}
