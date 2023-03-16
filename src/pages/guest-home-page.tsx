import { Link } from "react-router-dom";
import { MeetingList } from "../components/lists/meeting-list";
import { NavBar } from "../components/nav-bar";


export function HomePage() {

    return <>
        <NavBar />
        <MeetingList />
        <Link to='/complaintform'><button>Report a complaint</button></Link>

    </>
}