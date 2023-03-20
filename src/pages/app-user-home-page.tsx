import { AppUserMeetingList } from "../components/lists/app-user-meeting-list";
import { ComplaintList } from "../components/lists/complaint-list";
import { NavBar } from "../components/nav-bar";

export function AppUserHomePage() {

    return <>
        <NavBar />
        <div className="pageContainer">
            <AppUserMeetingList />
            <ComplaintList />
        </div>

    </>

}