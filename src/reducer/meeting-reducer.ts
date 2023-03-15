
export type Meeting = {
    meetingId: number,
    address: string,
    summary: string,
    time: number
}

export type SetMeetingAddress = { type: "SET_ADDRESS", payload: string };
export type SetMeetingSummary = { type: "SET_SUMMARY", payload: string };
export type SetMeetingTime = { type: "SET_TIME", payload: number };
export type AddMeeting = {type: "ADD_MEETING", payload: Meeting };

export type MeetingAction = SetMeetingAddress | SetMeetingSummary | SetMeetingTime | AddMeeting; 

export const initialState: Meeting = {
    meetingId: 0,
    address: "",
    summary: "",
    time: 0
}

export function MeetingReducer(state: Meeting = initialState, action: MeetingAction): Meeting {
    const nextState: Meeting = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "SET_ADDRESS": {
            nextState.address = action.payload;
            return nextState;
        }
        case "SET_SUMMARY": {
            nextState.summary = action.payload;
            return nextState;
        }
        case "SET_TIME": {
            nextState.time = action.payload;
            return nextState;
        }
        case "ADD_MEETING": {
            return nextState;
        }
    }  
}