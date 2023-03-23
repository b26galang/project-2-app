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
                navigate('/appuserhome');
            } else {
                alert('Incorrect login information');
            }
        } catch (error) {
            alert('Failed to verify login information');
        }
    }

    return <>
        <div style={{textAlign: 'center', paddingTop: '40px'}}>
            <h1 style={{fontSize: '40px'}}>Maple Island Complaint Submission</h1>
        </div>
        <div id="loginDiv">
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => signIn(e)}>
                <h3 style={{ fontSize: '25px', padding: '0px 30px' }}>Council Member Sign In</h3>
                <ul style={{ listStyle: "none", padding: '0px 60px' }}>
                    <li>
                        <label htmlFor="username">User Name:</label>
                    </li>
                    <li>
                        <input style={{ width: '220px' }} id="username" type="text" className="loginInputs" onChange={e => setForm({ ...form, username: e.target.value })} />
                    </li>
                    <br />
                    <li>
                        <label htmlFor="password">Password:</label>
                    </li>
                    <li>
                        <input style={{ width: '220px' }} id="password" type="password" className="loginInputs" onChange={e => setForm({ ...form, password: e.target.value })} />
                    </li>
                    <br /> <br />
                    <li>
                        <button style={{ marginLeft: '55px' }} type="submit">Log in</button>
                    </li>
                    <br />
                    <h3>Constituents:</h3>
                    <li>
                        <Link to={'/home'}><button id="constituentBtn">View meetings/File complaints</button></Link>
                    </li>
                </ul>
            </form>

        </div>
    </>
}