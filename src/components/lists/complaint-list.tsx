import { useEffect, useState } from "react";
import { Complaint, getComplaints } from "../../api/complaint-requests";
import { Link } from "react-router-dom"


export function ComplaintList() {

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            setComplaints(retrievedComplaints)
        })();
    }, []);

    return <>
        <h2>Complaints</h2>
        <table>
            <tbody>
                {complaints.map(c =>
                    <tr key={c.complaintId}>
                        <td>{c.description}</td>
                        <td>{c.status}</td>
                        <td><Link to={`/complaint/${c.complaintId}`}><button>Review</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}