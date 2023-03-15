import { useEffect, useState } from "react";
import { Complaint, getComplaints } from "../api/complaint-requests";


export function ComplaintList() {

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            setComplaints(retrievedComplaints)
        })();
    }, []);

    return <>
    <h1>Complaints List for App User</h1>
        <h2>Complaints</h2>
        <table>
            <tbody>
                {complaints.map(c =>
                    <tr key={c.complaintId}>
                        <td>{c.description}</td>
                        <td><button>Review</button></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}