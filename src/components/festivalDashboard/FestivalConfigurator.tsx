import type { Festival } from "../../types";
import "./FestivalConfigurator.css";
import ArtistsSection from "./ArtistsSection";
import StagesSection from "./StagesSection";
import VendorsSection from "./VendorsSection";
import StaffSection from "./StaffSection";

type props = {
    festival: Festival
    updateField: <K extends keyof Festival>(key: K, value: Festival[K]) => void;
    saveFestival: () => void;
    artistFns: {
        addArtist: (name: string, cost: string) => void
        removeArtist: (id: string) => void
    }
    stagesFns: {
        addStage: (name: string, cost: string, capacity: string) => void
        removeStage: (id: string) => void
    }
    vendorFns: {
        addVendor: (name: string, cost: string) => void;
        removeVendor: (id: string) => void;
    }
    staffFns: {
        addStaff: (name: string, cost: string) => void;
        removeStaff: (id: string) => void;
    }
}

export default function FestivalConfigurator({festival, updateField, saveFestival, artistFns, stagesFns, vendorFns, staffFns}: props) {

    return (
        <div className="ConfiguratorContainer">
            <input
                className="FestivalNameInput"
                value={festival.name}
                onChange={(e) => {updateField("name", e.target.value)}}
            />

            <div className="FestivalTicketCost">
                <h3 className="ConfigTitle">Ticket Cost</h3>
                <input 
                    value={festival.ticketCost ? `£${festival.ticketCost}` : "£0"}
                    onChange={(e) => {updateField("ticketCost", Number(e.target.value.slice(1)))}}
                />
            </div>

            <ArtistsSection artists={festival.artists} artistFns={artistFns}/>
            <StagesSection stages={festival.stages} stagesFns={stagesFns}/>
            <VendorsSection vendors={festival.vendors} vendorsFns={vendorFns}/> 
            <StaffSection staff={festival.staff} staffFns={staffFns}/>
            
            <div className="FestivalToilets">
                <h3 className="ConfigTitle">Toilets</h3>
                <input 
                    value={festival.toilets || 0}
                    onChange={(e) => {updateField("toilets", Number(e.target.value))}}
                />
            </div>

            <div className="FestivalBins">
                <h3 className="ConfigTitle">Bins</h3>
                <input 
                    value={festival.bins || 0}
                    onChange={(e) => {updateField("bins", Number(e.target.value))}}
                />
            </div>

            <div className="FestivalSpeakers">
                <h3 className="ConfigTitle">Speakers</h3>
                <input 
                    value={festival.speakers || 0}
                    onChange={(e) => {updateField("speakers", Number(e.target.value))}}
                />
            </div>

            <div className="FestivalMedics">
                <h3 className="ConfigTitle">Medics</h3>
                <input 
                    value={festival.medics || 0}
                    onChange={(e) => {updateField("medics", Number(e.target.value))}}
                />
            </div>

            <div className="FestivalDurationDays">
                <h3 className="ConfigTitle">Duration (Days)</h3>
                <input 
                    value={festival.durationDays || 0}
                    onChange={(e) => {updateField("durationDays", Number(e.target.value))}}
                />
            </div>


            <div className="saveConfigContainer">
                <button onClick={saveFestival}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}