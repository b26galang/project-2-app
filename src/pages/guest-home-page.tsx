import { Link } from "react-router-dom";
import { MeetingList } from "../components/lists/meeting-list";
import { NavBar } from "../components/nav-bar";


export function HomePage() {

    return <div>
        <NavBar />
        <div className="pageContainer">
            <MeetingList />
            <br />
            <Link to='/complaintform'><button className="bigBtn" style={{ margin: '20px' }}>File a complaint</button></Link>
        </div>
    </div>
}