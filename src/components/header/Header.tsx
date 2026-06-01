import { useNavigate } from "react-router-dom"
import "./Header.css"
import { useAuth } from "../../auth/AuthProvider"
import logo from "../../assets/logo.svg";
import Seperator from "../misc/Seperator";

export default function Header(){
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    return (
        <header className="HeaderContainer">
            <button
                className="HeaderTitle"
                onClick={() => navigate("/")}
                aria-label="Go to homepage"
            >
                <img src={logo} alt="" />
                <span>FestivalSim</span>
            </button>

            <div className="HeaderNav">

            </div>


            <div className="HeaderUser">
                {user ? (
                    <>
                        <span className="Username">{user.username}</span>
                        <Seperator/>
                        <button
                            className="LogoutButton"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}