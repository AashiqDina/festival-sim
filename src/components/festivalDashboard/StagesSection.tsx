import { useState } from "react";
import type { Stage } from "../../types";
import Cross from "../misc/Cross";
import Seperator from "../misc/Seperator";

type props = {
    stages: Stage[]
    stagesFns: {
        addStage: (name: string, cost: string, capacity: string) => void
        removeStage: (id: string) => void
    }
}

export default function StagesSection({stages, stagesFns}: props){
    const [stageForm, setStageForm] = useState({name: "", cost: "", capacity: ""});

    const handleAddStage = () => {
        stagesFns.addStage(stageForm.name, stageForm.cost, stageForm.capacity)
        setStageForm({name: "", cost: "", capacity: ""})
    }

    const handleRemoveStage = (id: string) => {
        stagesFns.removeStage(id)
    }

    return (
        <div className="FestivalStages">
            <div className="AddStagesForm">
                <h3 className="ConfigTitle">Stages</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddStage()}}>
                    <input 
                        placeholder="Stage Name (e.g. A Theatre)"
                        value={stageForm.name}
                        onChange={(e) => {setStageForm(prev => ({...prev, name: e.target.value}))}}
                    />
                    <input 
                        placeholder="Cost (e.g. £200)"
                        value={`${stageForm.cost}`}
                        onChange={(e) => {setStageForm(prev => ({...prev, cost: e.target.value}))}}
                    />
                    <input 
                        placeholder="Capacity (e.g. 2000)"
                        value={`${stageForm.capacity}`}
                        onChange={(e) => {setStageForm(prev => ({...prev, capacity: e.target.value}))}}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="StagesCollection">
                {
                    stages.map((stage) => {
                        return (
                            <div className="PlannedStages" key={stage.id}>
                                <p>{stage.name}</p>
                                <Seperator/>
                                <span>£{stage.cost}</span>
                                <Seperator/>
                                <span>{stage.capacity} cap</span>
                                <button 
                                    className="DeleteStage"
                                    onClick={() => {handleRemoveStage(stage.id)}}
                                    >
                                    <Cross/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}