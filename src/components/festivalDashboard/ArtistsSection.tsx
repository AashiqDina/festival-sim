import { useState } from "react";
import type { Artist } from "../../types";
import Cross from "../misc/Cross";
import Seperator from "../misc/Seperator";

type props = {
    artists: Artist[]
    artistFns: {
        addArtist: (name: string, cost: string) => void
        removeArtist: (id: string) => void
    }
}

export default function ArtistSection({artists, artistFns}: props){
    const [artistForm, setArtistForm] = useState({name: "", cost: ""});

    const handleAddArtist = () => {
        artistFns.addArtist(artistForm.name, artistForm.cost)
        setArtistForm({name: "", cost: ""})
    }

    const handleRemoveArtist = (id: string) => {
        artistFns.removeArtist(id)
    }

    return (
        <div className="FestivalArists">

            <div className="AddArtistsForm">
                <h3 className="ConfigTitle">Artists</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddArtist()}}>
                    <input 
                        placeholder="Artist Name (e.g. Queen)"
                        value={artistForm.name}
                        onChange={(e) => {setArtistForm(prev => ({...prev, name: e.target.value}))}}/>
                    <input 
                        placeholder="Cost (e.g. £200)"
                        value={`${artistForm.cost}`}
                        onChange={(e) => {setArtistForm(prev => ({...prev, cost: e.target.value}))}}
                        />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="ArtistCollection">
                {
                    
                    artists.map((artist) => {
                        return (
                            <div className="PlannedArtist" key={artist.id}>
                                <p>{artist.name}</p>
                                <Seperator/>
                                <span>£{artist.cost}</span>
                                <button 
                                    className="DeleteArtist"
                                    onClick={() => {handleRemoveArtist(artist.id)}}
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