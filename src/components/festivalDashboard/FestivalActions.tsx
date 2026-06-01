import type { Festival } from "../../types";
import { exportFestivalCSV, exportFestivalJSON } from "../../utils/exportFestival";
import "./FestivalActions.css"

type props = {
    festival: Festival;
    runSimulation: () => void
}

export default function FestivalActions({festival, runSimulation}: props){
    
    if(!festival?.result) return (
        <div className="ActionsContainer">
            <div className="ButtonCollection">
                <div className="ActionsButtonContainer">
                    <button className="RunSimButton" onClick={() => {runSimulation()}}>Run Simulation</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="ActionsContainer">
            <div className="ButtonCollection">
                <div className="ActionsButtonContainer">
                    <button className="RunSimButton" onClick={() => {runSimulation()}}>Run Simulation</button>
                    <button className="RunSimButton" onClick={() => {exportFestivalCSV(festival)}}>Export as CSV</button>
                    <button className="RunSimButton" onClick={() => {exportFestivalJSON(festival)}}>Export as JSON</button>
                </div>
            </div>
        </div>
    )
}