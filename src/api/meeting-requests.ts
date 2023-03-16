import { MeetingInputs } from "../components/forms/meeting-form";
import { Meeting } from "../reducer/meeting-reducer";
import { url } from "./complaint-requests";

export async function createMeeting(meeting: MeetingInputs): Promise<Meeting> {
    const response = await fetch(`${url}/meetings`, {
        method: "POST",
        body: JSON.stringify(meeting),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const newMeeting: Meeting = await response.json();
    return newMeeting;
}

export async function updateMeeting(meeting: Meeting): Promise<Meeting> {
    const response = await fetch(`${url}/meetings/${meeting.meetingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meeting),
    });

    const updatedMeeting: Meeting = await response.json();
    return updatedMeeting;
}

export async function getMeetings(): Promise <Meeting[]> {
    const response = await (await (fetch(`${url}/meetings`))).json()
    return response;
}

export async function getMeetingById(id: Meeting): Promise<Meeting | null> {
    const response = await fetch(`${url}/meetings/${id.meetingId}`);
    if (!response.ok) {
        alert('No meeting was found with that ID')
        return null;
    }
    const retrievedMeeting: Meeting | null = await response.json();
    return retrievedMeeting;
}

export async function deleteMeeting(id: Meeting): Promise<void> {
    await fetch(`${url}/meetings/${id.meetingId}`, {
        method: 'DELETE',
    });
}

