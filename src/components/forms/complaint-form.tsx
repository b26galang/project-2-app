import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint } from "../../api/complaint-requests";
import { NavBar } from "../nav-bar";

export type ComplaintInput = {
    description: string,
}

export function ComplaintForm() {

    const [complaint, setComplaint] = useState<ComplaintInput>({ description: '' });
    const numRows = 6;

    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createComplaint(complaint);
        setComplaint({ description: '' });
        navigate('/home');
    }

    return <>
        <NavBar />
        <div className="pageContainer" style={{paddingTop: '100px'}}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Please describe your complaint: </label>
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