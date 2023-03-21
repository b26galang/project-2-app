import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAppUser } from "../api/app-user-requests";

export type UserInfo = {
    username: string,
    password: string,
}

export function LoginPage() {

    const navigate = useNavigate();
    const [form, setForm] = useState<UserInfo>({ username: "", password: "" });

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const user = await loginAppUser(form.username, form.password);
            if (user) {
                localStorage.setItem('username', user.username);
                localStorage.setItem('userId', user.password);
                navigate('/appuserhome');
            } else {
                alert('Incorrect login information');
            }
        } catch (error) {
            alert('Failed to verify login information');
        }
    }

    return <div id="loginDiv">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => signIn(e)}>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <h3>Council Member Sign In</h3>
                </li>
                <li>
                    <label htmlFor="username">User Name:</label>
                </li>
                <li>
                    <input id="username" type="text" className="loginInputs" onChange={e => setForm({ ...form, username: e.target.value })} />
                </li>
                <br />
                <li>
                    <label htmlFor="password">Password:</label>
                </li>
                <li>
                    <input id="password" type="password" className="loginInputs" onChange={e => setForm({ ...form, password: e.target.value })} />
                </li>
                <br /> <br />
                <li>
                    <button style={{ marginLeft: '45px' }} type="submit">Log in</button>
                </li>
                <br />
                <h3>Constituents:</h3>
                <li>
                    <Link to={'/home'}><button id="constituentBtn">View meetings/File complaints</button></Link>
                </li>
            </ul>
        </form>

    </div>
}