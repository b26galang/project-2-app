import { Link, useNavigate } from "react-router-dom";

export function NavBar() {

    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return <div style={{ backgroundColor: "#227dfc", color: "white", height: "40px", paddingTop: "10px", display: 'block' }}>
        {localStorage.length > 0 ? <>
            <Link to={'/appuserhome'} className="homeLink">Home</Link>
            <a className="logBtn" onClick={logout}>
                Logout
            </a>
        </> : <>
            <Link to={'/home'} className="homeLink">Home</Link>
            <Link className="logBtn" to={'/'}>
                Login
            </Link>
        </>
        }


    </div>
}