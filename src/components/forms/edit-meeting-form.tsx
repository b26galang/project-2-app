import { FormEvent, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { deleteMeeting, getMeetingById, updateMeeting } from "../../api/meeting-requests";
import { initialState, Meeting, MeetingReducer } from "../../reducer/meeting-reducer";

export function EditMeetingForm() {

    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState<Meeting>();
    const [meetingState, dispatch] = useReducer(MeetingReducer, initialState);

    useEffect(() => {
        getMeetingById(Number(meetingId)).then((data) => setMeeting(data));
    }, [meetingId]);

    function handleDelete() {
        deleteMeeting(Number(meetingId));
    }

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (meetingId) {
            let meeting: Meeting = {
                meetingId: parseInt(meetingId, 10),
                address: meetingState.address,
                summary: meetingState.summary,
                time: meetingState.time
            }
            updateMeeting(meeting);
        }
    }



    return <>

        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
            <h2>Edit Meeting</h2>
            {meeting &&
                <ul>
                    <li>
                        <label htmlFor="address">Address: {meeting.address}</label>
                    </li>
                    <li>
                        <input id="address" type="text" onChange={e => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} required />
                    </li>
                    <li>
                        <label htmlFor="summary">Summary: {meeting.summary}</label>
                    </li>
                    <li>
                        <input id="summary" type="text" onChange={e => dispatch({ type: "SET_SUMMARY", payload: e.target.value })} required />
                    </li>
                    <li>
                        <label htmlFor="time">Time {meeting.time}</label>
                    </li>
                    <li>
                        <input id="time" type="number" onChange={e => dispatch({ type: "SET_TIME", payload: Number(e.target.value) })} required />
                    </li>
                    <li>
                        <button type="submit">Update</button><button onClick={handleDelete}>Delete</button>
                    </li>
                </ul>
            }
        </form>

    </>

}