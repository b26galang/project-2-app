import { useEffect, useState } from "react";
import { Complaint, getComplaints, getComplaintsByStatus } from "../../api/complaint-requests";
import { Link } from "react-router-dom"


export function ComplaintList() {

    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [newComplaints, setNewComplaints] = useState<Complaint[]>([]);


    useEffect(() => {
        (async () => {
            const unreviewedComplaints = await getComplaintsByStatus("UNREVIEWED");
            setNewComplaints(unreviewedComplaints)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const retrievedComplaints = await getComplaints();
            const sortedComplaints = sortComplaintsByStatus(retrievedComplaints);
            setComplaints(sortedComplaints)
        })();
    }, []);

    function sortComplaintsByStatus(complaints: Complaint[]) {
        return complaints.sort((a, b) => {
            if (a.status === "UNREVIEWED" && b.status !== "UNREVIEWED") {
                return -1;
            } else if (b.status === "UNREVIEWED" && a.status !== "UNREVIEWED") {
                return 1;
            } else {
                return a.status.localeCompare(b.status);
            }
        });
    };

    return <>
        <h2>Complaints {newComplaints.length > 0 ? `( ${newComplaints.length} new )` : null} </h2>
        <table>
            <tbody>
                {complaints.map(c =>
                    <tr key={c.complaintId}>
                        <td>{c.description}</td>
                        {c.status === "UNREVIEWED" ? null :
                            <td>{c.status}</td>}
                        <td><Link to={`/complaint/${c.complaintId}`}><button>Review</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}