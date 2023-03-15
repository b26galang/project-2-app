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
        <h2>Complaints</h2>
        <table>
            {complaints.map(c =>
                <tr key={c.id}>
                    <td>{c.description}</td>
                    <td><button>Review</button></td>
                </tr>)}

        </table>

    </>
}