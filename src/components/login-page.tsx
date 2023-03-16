import { Link } from "react-router-dom";
import { NavBar } from "./nav-bar";


export function LoginPage() {


    return <>

        <button>Log in</button>

        <Link to={'/home'}><button>Continue as guest</button></Link>

    </>
}