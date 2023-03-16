import { Link } from "react-router-dom";

export function NavBar() {

    return <div style={{ backgroundColor: "#0085fc", color: "white", height: "50px", padding: "5px" }}>
        <ul>
            <li className="navBarItem"><Link to="/">Login</Link></li>
        </ul>

    </div>
}