import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const submitForm = () => {
        setError(null)

        const result = login(username, password);

        if (!result.success && result.message) {
            setError(result.message);
            return;
        }

        navigate("/")
    };

    return (
        <section className="LoginPage">
            <form action="" onSubmit={(e) => { e.preventDefault(); submitForm()}}  className={`LoginForm ${error ? "error" : ""}`}>
                <h1>Login</h1>

                <label htmlFor="LoginUsername">Username</label>
                <input 
                    id="LoginUsername"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="e.g. AashiqD"
                    onChange={(e) => {setUsername(e.target.value); setError(null)}}
                />

                <label htmlFor="LoginPassword">Password</label>
                <input 
                    id="LoginPassword" 
                    type="password" 
                    required 
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    onChange={(e) => {setPassword(e.target.value); setError(null)}}
                />

                <button type="submit">Login</button>

                {error && <p className="LoginErr">{error}</p>}

                <p>
                    Don't have an account?{" "} 
                    <Link className="RegisterNav" to="/register">Register</Link>
                </p>
            </form>
        </section>
    )
}