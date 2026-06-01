import { useState } from "react"
import "./FestivalSimulations.css"
import type { Festival, FestivalSimulation } from "../../types"
import { MetricRow } from "./MetricRow"

type props = {
    festival: Festival
}

export default function FestivalSimulations({festival}: props){
    const [day, setDay] = useState<number>(0)

    if(!festival.result){
        return(
            <div className="SimulationsContainerBlank">
                <h2>Run a simulation to generate results</h2>
            </div>
        )
    }

    const simResults: FestivalSimulation[] = festival.result.simulation

    return (
        <div className="SimulationsContainer">
            <div className="SimHeader">
                {day > 0 ? <button onClick={() => {setDay(prev => prev-1)}}><div className="LeftArrow" /></button> : <button disabled/>}
                <h2>Day {day+1}</h2>
                {day !== simResults.length - 1 ? <button onClick={() => {setDay(prev => prev+1)}}><div className="RightArrow"/></button> : <button disabled/>}
            </div>
            <div className="SimBody">
                <MetricRow label={"Attendance"} value={`${simResults[day].attendance}/${simResults[day].maxCapacity}`}/>
                <MetricRow label={"Weather"} value={simResults[day].weather.charAt(0).toUpperCase() + simResults[day].weather.slice(1)}/>
                <MetricRow label={"Ticket Revenue"} value={`£${simResults[day].ticketRevenue.toFixed(2) || 0}`}/>
                <MetricRow label={"Vendor Revenue"} value={`£${simResults[day].vendorRevenue.toFixed(2) || 0}`}/>
                <MetricRow label={"Crowd Satisfaction"} value={`${simResults[day].crowdSatisfaction}%`}/>                                     
            </div>
        </div>
    )
}