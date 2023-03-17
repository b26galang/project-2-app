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

export async function getMeetingById(id: number): Promise<Meeting> {
    const response = await fetch(`${url}/meetings/${id}`);
    const retrievedMeeting: Meeting = await response.json();
    return retrievedMeeting;
}

export async function deleteMeeting(id: number): Promise<void> {
    await fetch(`${url}/meetings/${id}`, {
        method: 'DELETE',
    });
}

