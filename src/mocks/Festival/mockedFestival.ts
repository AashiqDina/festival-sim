import type { Festival } from "../../types";

export const mockedFestival: Festival = {
    id: "1",
    name: "TestFest",
    artists: [
        { id: "1", name: "The TESTER", cost: 100 },
        { id: "2", name: "The DEBUGGR", cost: 100 }

    ],
    stages: [
        { id: "1", name: "Jest", capacity: 1000, cost: 1000 },
        { id: "2", name: "Typescript", capacity: 1000, cost: 1000 }
    ],
    vendors: [{ id: "1", name: "Mock Seller", costPerDay: 100, revenuePerAttendee: 5 }],
    staff: [
        { id: "1", name: "Bug Fixer", costPerDay: 50 },
        { id: "2", name: "Bug Fixer", costPerDay: 50 },

    ],
    toilets: 10,
    bins: 10,
    speakers: 10,
    medics: 10,
    ticketCost: 100,
    durationDays: 2,
};