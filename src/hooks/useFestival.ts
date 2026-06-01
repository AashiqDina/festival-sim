import { useEffect, useState } from "react";
import { getFestival, updateFestival } from "../services/festivalService";
import type { Festival, User } from "../types";
import { simulateFestival } from "../services/simulateFestival";

export function useFestival(user: User | null, id: string | undefined, updateUser: (user: User) => void) {
    const [festival, setFestival] = useState<Festival | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        try{
            if (!user || !id) throw new Error("Missing user or festival")

            const result = getFestival(user, id)
            setFestival(result)
        } 
        catch(err){
            setError(err instanceof Error ? err.message : "Unknown error")
        }
    }, [user, id])

    const resetSuccess = () => setSuccess(null)

    const updateField = <K extends keyof Festival>(key: K, value: Festival[K]) => {
        try {
            if (!festival) throw new Error("Festival not found")

            setFestival(prev => {
                if (!prev) return prev
                return {
                    ...prev,
                    [key]: value
                }
            })
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    }

    const saveFestival = () => {
        try {
            if (!user) throw new Error("User not found")
            if (!festival) throw new Error("Festival not found")

            const updatedUser = updateFestival(festival, user)
            updateUser(updatedUser)
            setSuccess("Successfully Saved")

        }
        catch(err){
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    };

    const runSimulation = () => {
        try {
            if(!festival) throw new Error("Festival not found");
            if(festival.artists.length <=0) throw new Error("Must have at least one artist");
            if(festival.stages.length <=0) throw new Error("Must have at least one stage");
            if(festival.durationDays <=0) throw new Error("Must be at least one day");


            const result = simulateFestival(festival);
            

            setFestival(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    result
                };
            });
            setSuccess("Simulation Completed")
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unknown Error");
        }
    }

    const addArtist = (name: string, cost: string) => {
        try {
            const numberCost = parseFloat(cost);
            if(name === "") throw new Error("Invalid Name")
            if(isNaN(numberCost)) throw new Error("Invalid Cost")

            if(!festival) throw new Error("Festival doesnt exist")

            const newArtists = [...festival.artists, {id: crypto.randomUUID(), name: name, cost: numberCost}]
            updateField("artists", newArtists)

        }
        catch(err){
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    }

    const addStage = (name: string, cost: string, capacity: string) => {
        try {
            const numberCost = parseFloat(cost)
            const numberCapacity = parseInt(capacity)

            if(name === "") throw new Error("Invalid Name")
            if (isNaN(numberCost)) throw new Error("Invalid Cost")
            if (isNaN(numberCapacity)) throw new Error("Invalid Capacity")

            if (!festival) throw new Error("Festival doesn't exist")

            const newStages = [
                ...festival.stages,
                {
                    id: crypto.randomUUID(),
                    name,
                    cost: numberCost,
                    capacity: numberCapacity
                }
            ];

            updateField("stages", newStages);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    };

    const addVendor = (name: string, cost: string) => {
        const revenuePerAttendee = "5" // simple for now may improve if I have time to have options of vendor types and base revenue on that
        try {
            const numberCost = parseFloat(cost)
            const numberRevenue = parseFloat(revenuePerAttendee)

            if(name === "") throw new Error("Invalid Name")
            if (isNaN(numberCost)) throw new Error("Invalid Cost")
            if (isNaN(numberRevenue)) throw new Error("Invalid Revenue Per Attendee")

            if (!festival) throw new Error("Festival doesn't exist")

            const newVendors = [
                ...festival.vendors,
                {
                    id: crypto.randomUUID(),
                    name,
                    costPerDay: numberCost,
                    revenuePerAttendee: numberRevenue
                }
            ];

            updateField("vendors", newVendors);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unknown Error");
        }
    };

    const addStaff = (name: string, cost: string) => {
        try {
            const numberCost = parseFloat(cost)

            if(name === "") throw new Error("Invalid Name")
            if (isNaN(numberCost)) throw new Error("Invalid Cost")
            if (!festival) throw new Error("Festival doesn't exist")

            const newStaff = [
                ...festival.staff,
                {
                    id: crypto.randomUUID(),
                    name,
                    costPerDay: numberCost
                }
            ];

            updateField("staff", newStaff)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    }

    const removeFromFestivalArray = <K extends keyof Festival>(key: K, id: string) => {
        try {
            if (!festival) throw new Error("Festival doesn't exist")

            setFestival(prev => {
                if (!prev) return prev
                return {
                    ...prev,
                    [key]: (prev[key] as any).filter((item: any) => item.id !== id)
                }
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown Error")
        }
    };

    const actions = {
        artistFns: {
            addArtist,
            removeArtist: (id: string) => removeFromFestivalArray("artists", id)
        },
        stagesFns: {
            addStage,
            removeStage: (id: string) => removeFromFestivalArray("stages", id)
        },
        vendorFns: {
            addVendor,
            removeVendor: (id: string) => removeFromFestivalArray("vendors", id)
        },
        staffFn: {
            addStaff,
            removeStaff: (id: string) => removeFromFestivalArray("staff", id)
        }

    }

    return {festival, error, setError, success, resetSuccess, updateField, saveFestival, runSimulation, actions}
}