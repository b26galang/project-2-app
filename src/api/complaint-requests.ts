import { ComplaintInput } from "../components/forms/complaint-form";

export type Complaint = {
    complaintId: number,
    description: string,
    status: string,
    meetingId: number,
}

export type ComplaintId = {
    complaintId: number
}

export const url = "http://52.3.247.213:8080";

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

export async function getComplaintById(id: number): Promise<Complaint> {
    const response = await fetch(`${url}/complaints/${id}`);
    const retrievedComplaint: Complaint = await response.json();
    return retrievedComplaint;
}

export async function getComplaintsByStatus(status: string): Promise<Complaint[]> {
    const response = await fetch(`${url}/complaints?flag=${status}`);
    const retrievedComplaints: Complaint[] = await response.json();
    return retrievedComplaints;
}

export async function deleteComplaint(id: number): Promise<void> {
    await fetch(`${url}/complaints/${id}`, {
        method: 'DELETE',
    });
}

