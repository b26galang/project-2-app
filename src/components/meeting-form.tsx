import { FormEvent, useReducer } from "react";
import { createMeeting } from "../api/meeting-requests";
import { initialState, MeetingReducer } from "../reducer/meeting-reducer";

export type MeetingInputs = {
    address: string,
    summary: string,
    time: number
}

export function MeetingForm() {

    const [meetingState, dispatch] = useReducer(MeetingReducer, initialState);

    async function submitData(event: FormEvent<HTMLFormElement>) {
        let meeting: MeetingInputs = { address: "", summary: "", time: 0 };
        meeting.address = meetingState.address;
        meeting.summary = meetingState.summary;
        meeting.time = meetingState.time;

        createMeeting(meeting);
    }

    return <>

        <h1>Create Meeting (App User)</h1>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
            <h2>Create a Meeting</h2>
            <ul>
                <li>
                    <label htmlFor="address">Address</label>
                </li>
                <li>
                    <input id="address" type="text" onChange={e => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} required />
                </li>
                <li>
                    <label htmlFor="summary">Summary</label>
                </li>
                <li>
                    <input id="summary" type="text" onChange={e => dispatch({ type: "SET_SUMMARY", payload: e.target.value })} required />
                </li>
                <li>
                    <label htmlFor="time">Time</label>
                </li>
                <li>
                    <input id="time" type="number" onChange={e => dispatch({ type: "SET_TIME", payload: Number(e.target.value) })} required />
                </li>
                <li>
                    <button type="submit">Create Meeting</button>
                </li>
            </ul>
        </form>
    </>

}