import { ComplaintInput } from "../components/complaint-form";

export type Complaint = {
    complaintId: number,
    description: string,
    status: string,
    meetingId: number,
}

export const url = "http://127.0.0.1:8080";

export async function createComplaint(complaint: ComplaintInput): Promise<Complaint> {
    const response = await fetch(`${url}/complaints`, {
        method: "POST",
        body: JSON.stringify(complaint),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const newComplaint: Complaint = await response.json();
    return newComplaint;
}

export async function updateComplaint(complaint: Complaint): Promise <Complaint> {
    const response = await fetch(`${url}/complaints/${complaint.complaintId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaint),
    });

    const updatedComplaint: Complaint = await response.json();
    return updatedComplaint;
}

export async function getComplaints(): Promise <Complaint[]> {
    const response = await (await (fetch(`${url}/complaints`))).json()
    return response;
}

export async function getComplaintById(id: Complaint): Promise<Complaint | null> {
    const response = await fetch(`${url}/characters/${id.complaintId}`);
    if (!response.ok) {
        alert('No complaint was found with that ID')
        return null;
    }
    const retrievedComplaint: Complaint | null = await response.json();
    return retrievedComplaint;
}

