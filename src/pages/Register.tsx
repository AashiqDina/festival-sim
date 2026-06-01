import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

export default function Register(){
    const { register } = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const submitForm = () => {
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = register(username, password);

        if (!result.success && result.message) {
            setError(result.message);
            return;
        }

        navigate("/")
    };
    
    return (
        <section className="RegisterPage">
            <form onSubmit={(e) => { e.preventDefault(); submitForm()}} className={`RegisterForm ${error ? "error" : ""}`}>
                <h1>Register</h1>

                <label htmlFor="RegisterUsername">Username</label>
                <input 
                    id="RegisterUsername"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="e.g. AashiqD"
                    onChange={(e) => {setUsername(e.target.value); setError(null)}}
                />

                <label htmlFor="RegisterPassword">Password</label>
                <input 
                    id="RegisterPassword" 
                    type="password" 
                    required 
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    onChange={(e) => {setPassword(e.target.value); setError(null)}}
                />

                <label htmlFor="RegisterConfirmPassword">Confirm Password</label>
                <input 
                    id="RegisterConfirmPassword" 
                    type="password" 
                    required 
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    onChange={(e) => {setConfirmPassword(e.target.value); setError(null);}}
                />

                <button type="submit">Register</button>

                {error && <p className="RegisterErr">{error}</p>}

                <p>
                    Already have an account?{" "} 
                    <Link className="LoginNav" to="/login">Login</Link>
                </p>
            </form>
        </section>
    )
}