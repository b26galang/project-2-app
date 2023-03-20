import { Link } from "react-router-dom";

export function LoginPage() {

    return <div id="loginDiv">
        <form>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <h3>Sign In</h3>
                </li>
                <li>
                    <label htmlFor="username">User Name:</label>
                </li>
                <li>
                    <input id="username" type="text" className="loginInputs" />
                </li>
                <br />
                <li>
                    <label htmlFor="password">Password:</label>
                </li>
                <li>
                    <input id="password" type="password" className="loginInputs" />
                </li>
                <br /> <br />
                <li>
                    <button style={{ marginLeft: '45px'}}>Log in</button>
                </li>
                <br />
                <li>
                    <Link to={'/home'}><button className="bigBtn">Continue as guest</button></Link>
                </li>
            </ul>
        </form>

    </div>
}