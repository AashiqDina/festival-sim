import { useNavigate } from "react-router-dom"
import { createFestival } from "../../services/festivalService"
import "./CreateFestivalBox.css"
import { useAuth } from "../../auth/AuthProvider"

type props = {
    onError: (msg: string) => void
}

export default function CreateFestivalBox({onError}: props){
    const { user, updateUser } = useAuth();
    const navigate = useNavigate()

    const handleCreateFestival = () => {
        try {
            if(!user) throw Error("User not found")
            const result = createFestival(user)
            updateUser(result.user)
            navigate(`/festival/${result.festival.id}`)
        } 
        catch(err){
            if(err instanceof Error){
                onError(err.message)
            }
            else{
                onError("Unknow Error")
            } 
        }
    }

    return (
        <button className="NewFestivalBox" onClick={handleCreateFestival}>
            <div>
                <h1>+</h1>
            </div>
        </button>
    )
}