import { useState, FormEvent } from "react";
import { createComplaint } from "../api/complaint-requests";

export type ComplaintInput = {
    description: string,
}

export function ComplaintForm() {

    const [complaint, setComplaint] = useState<ComplaintInput>({ description: '' });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createComplaint(complaint);
        setComplaint({ description: '' });
    }

    return <>

        <form onSubmit={handleSubmit}>
            <h1>Complaint Form</h1>
            <h2>Submit a Complaint</h2>
            <label htmlFor="description">Description</label>
            <input
                id="description"
                name="description"
                type="text"
                value={complaint.description}
                onChange={e => setComplaint({ description: e.target.value })}
                required />
            <button type="submit">Post</button>
        </form>

    </>
}