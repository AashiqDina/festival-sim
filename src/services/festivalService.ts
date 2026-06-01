import { type User, type Festival } from "../types";

export function createFestival(user: User): {festival: Festival, user: User}{

    const newFestival: Festival = {
        id: crypto.randomUUID(),
        name: `Festival ${user.festivals.length + 1}`,
        artists: [],
        stages: [],
        vendors: [],
        staff: [],
        toilets: 0,
        bins: 0,
        speakers: 0,
        medics: 0,
        ticketCost: 0,
        durationDays: 0
    };

    const updatedUser: User = {
        ...user,
        festivals: [...user.festivals, newFestival]
    };

    return { festival: newFestival, user: updatedUser};
}

export function getFestival(user: User, id: string): Festival{
    const festival = user.festivals.find(f => f.id === id)

    if (!festival) {
        throw new Error("Festival not found");
    }

    return festival;
}

export function updateFestival(festival: Festival, user: User){
    const updatedFestivals = user.festivals.map(f =>f.id === festival.id ? festival : f)

    return {
        ...user,
        festivals: updatedFestivals
    }
}
