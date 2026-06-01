import "./Home.css"
import { useAuth } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import CreateFestivalBox from "../components/home/CreateFestivalBox"
import FestivalBox from "../components/home/FestivalBox"
import Banner from "../components/banner/Banner"
import { useState } from "react"

export default function Home(){
    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null) // home owns err state to stop multiple stacked errors in possible additions in future developement

    if(!user) return (
        <section className="HomeContainer">
            {error && <Banner message={error} success={false} closeBanner={() => {setError(null)}}/>}
            <h1>Plan and simulate music festivals with realistic economics and logistics.</h1>
            <button className="GetStarted" onClick={() => navigate("/login")}>Get Started</button>
        </section>
    )

    return (
        <section className="HomeContainer LoggedIn">
            {error && <Banner message={error} success={false} closeBanner={() => {setError(null)}}/>}
            <CreateFestivalBox onError={(msg) => setError(msg)}/>
            {
                user.festivals.map((festival) => {
                    return (
                        <FestivalBox festivalData={festival} key={festival.id}/>
                    )
                })
            }
        </section>
    )
}