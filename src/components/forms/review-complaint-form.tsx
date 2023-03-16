import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Complaint, getComplaintById, getComplaints, updateComplaint, complaintId } from "../../api/complaint-requests";


export function ReviewComplaintForm() {


    const { complaintId } = useParams<{ complaintId: string }>();
    const [complaint, setComplaint] = useState<Complaint>();
    const [status, setStatus] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (complaintId) {
            const id = parseInt(complaintId, 10);
            getComplaintById({ complaintId: id }).then((data) => setComplaint(data));
        }
    }, [complaintId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (complaint) {
            const updatedComplaint = { ...complaint, status: status };
            await updateComplaint(updatedComplaint);
            setComplaint(updatedComplaint);
            navigate('/appuserhome');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <legend>Status</legend>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="status" value="UNREVIEWED" onChange={(e) => setStatus(e.target.value)} />
                            UNREVIEWED
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="status" value="HIGH PRIORITY" onChange={(e) => setStatus(e.target.value)} />
                            HIGH PRIORITY
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="status" value="LOW PRIORITY" onChange={(e) => setStatus(e.target.value)} />
                            LOW PRIORITY
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="status" value="IGNORED" onChange={(e) => setStatus(e.target.value)} />
                            IGNORED
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="status" value="ADDRESSED" onChange={(e) => setStatus(e.target.value)} />
                            ADDRESSED
                        </label>
                    </li>
                </ul>
                <button type="submit">Set Status</button>
            </form>
        </>
    );
}
