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

    async function applyFilter(event: React.ChangeEvent<HTMLSelectElement>, status: string) {
        event.preventDefault();
        switch(status) {
            case "UNREVIEWED": {
                const unreviewedComplaints = await getComplaintsByStatus("UNREVIEWED");
                setComplaints(unreviewedComplaints);
                break;
            }
            case "HIGH PRIORITY": {
                const highPriorityComplaints = await getComplaintsByStatus("HIGH PRIORITY");
                setComplaints(highPriorityComplaints);
                break;
            }
            case "LOW PRIORITY": {
                const lowPriorityComplaints = await getComplaintsByStatus("LOW PRIORITY");
                setComplaints(lowPriorityComplaints);
                break;
            }
            case "IGNORED": {
                const ignoredComplaints = await getComplaintsByStatus("IGNORED");
                setComplaints(ignoredComplaints);
                break;
            }
            default: {
                const complaints = await getComplaints();
                setComplaints(sortComplaintsByStatus(complaints));
            }
        }
    }

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
            <h2 style={{ flex: '1', textAlign: 'center', margin: '30px auto' }}>Complaints {newComplaints.length > 0 ? `( ${newComplaints.length} new )` : null}</h2>
        </div>
        <table style={{ width: '950px', marginBottom: '20px' }}>
            <tr>
                <td style={{ paddingLeft: '25px' }}>
                    <select style={{ width: '200px' }} onChange={(e) => applyFilter(e, e.target.value)}>
                        <option value="">- Filter by status -</option>
                        <option value="UNREVIEWED">UNREVIEWED</option>
                        <option value="HIGH PRIORITY">HIGH PRIORITY</option>
                        <option value="LOW PRIORITY">LOW PRIORITY</option>
                        <option value="IGNORED">IGNORED</option>
                    </select>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '0px' }}>
                    <button onClick={handleDelete} className="deleteBtn">Delete</button>
                </td>
            </tr>
        </table>


        <table style={{width: '1000px'}}>
            <tbody>
                {complaints.map(c =>
                    <tr key={c.complaintId}>
                        {c.status === "IGNORED" ?
                            <td style={{ padding: '0px' }}><input type="checkbox" onChange={(e) => handleCheckBoxInput(e, c.complaintId)} value={c.complaintId} /></td>
                            : <td></td>
                        }
                        <td style={{ paddingLeft: '0px', width: '600px' }}>{c.description}</td>
                        <td style={{ }}>{c.status}</td>

                        <td><Link to={`/complaint/${c.complaintId}`}><button>Review</button></Link></td>
                    </tr>)}
            </tbody>
        </table>
    </>
}