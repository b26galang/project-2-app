import { useEffect, useState } from "react";
import { Complaint, deleteComplaint, getComplaints, getComplaintsByStatus } from "../../api/complaint-requests";
import { Link } from "react-router-dom"


export function ComplaintList() {

    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [newComplaints, setNewComplaints] = useState<Complaint[]>([]);
    const [complaintsForDeletion, setComplaintsForDeletion] = useState<number[]>([]);

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

    function handleCheckBoxInput(event: React.ChangeEvent<HTMLInputElement>, complaintId: number) {
        setComplaintsForDeletion(prev => {
            if (prev.includes(complaintId)) {
                return prev.filter(id => id !== complaintId);
            } else {
                return [...prev, complaintId];
            }
        });
    }

    function handleDelete() {
        if (complaintsForDeletion.length === 0) {
            alert('There are no complaints selected for deletion.');
        } else {
            complaintsForDeletion.forEach(complaint => deleteComplaint(complaint));
            alert(`Deleted ${complaintsForDeletion.length} complaints`);
            setComplaints(complaints.filter(complaint => !complaintsForDeletion.includes(complaint.complaintId)));
        }
    }


    return <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'center', margin: '50px 300px' }}>Complaints {newComplaints.length > 0 ? `( ${newComplaints.length} new )` : null}</h2>
            <button onClick={handleDelete} className="deleteBtn">Delete</button>
        </div>
        <table>
            <tbody>

                {complaints.map(c =>
                    <tr key={c.complaintId}>
                        {c.status === "IGNORED" ?
                            <td style={{ width: '10px' }}><input type="checkbox" onChange={(event) => handleCheckBoxInput(event, c.complaintId)} value={c.complaintId} /></td>
                            : <td></td>
                        }
                        <td>{c.description}</td>
                        {c.status === "UNREVIEWED" ? null :
                            <td>{c.status}</td>}
                        <td><Link to={`/complaint/${c.complaintId}`}><button>Review</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}