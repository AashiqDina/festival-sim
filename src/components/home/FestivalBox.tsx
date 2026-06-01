import { useNavigate } from "react-router-dom"
import type { Festival } from "../../types"
import "./FestivalBox.css"

type props = {
    festivalData: Festival
}

export default function FestivalBox({festivalData}: props){
    const navigate = useNavigate()

    return (
        <div className="FestivalBox" onClick={() => navigate(`/festival/${festivalData.id}`)}>
            <h2>{festivalData.name}</h2>
            <p>Ticket Price: £{festivalData.ticketCost}</p>
            <div>
                <span>{festivalData.artists.length} artists</span>
                <span>{festivalData.stages.length} stages</span>
                <span>{festivalData.staff.length} staff</span>
            </div>
        </div>
    )
}