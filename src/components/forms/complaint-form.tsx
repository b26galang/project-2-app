import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createComplaint } from "../../api/complaint-requests";
import { NavBar } from "../nav-bar";

export type ComplaintInput = {
    description: string,
}

export function ComplaintForm() {

    const [complaint, setComplaint] = useState<ComplaintInput>({ description: '' });
    const numRows = 10;

    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createComplaint(complaint);
        setComplaint({ description: '' });
        alert('Complaint successfully submitted.')
        navigate('/home');
    }

    return <>
        <NavBar />
        <div className="pageContainer">
        <div style={{ textAlign: 'left', paddingTop: '40px', width: '1100px' }}>
                <Link to='/home'>
                    <button>← Back</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Please describe the issue: </label>
                <br /><br />
                <textarea
                    id="description"
                    name="description"
                    rows={numRows}
                    style={{width: '400px', fontSize: '15px'}}
                    value={complaint.description}
                    onChange={e => setComplaint({ description: e.target.value })}
                    required
                />
                {/* Add modal for confirmation */}
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
}