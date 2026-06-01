import type { Festival, FestivalSimulation, WeatherType } from "../types";
import { calculateCrowdSatisfaction } from "./calculateCrowdSatisfaction";

const weatherProbabilities: {type: WeatherType, probability: number}[] = [
    { type: "sunny", probability: 0.5 },
    { type: "cloudy", probability: 0.25 },
    { type: "rain", probability: 0.15 },
    { type: "snow", probability: 0.05 },
    { type: "storm", probability: 0.05 }
];

function getRandomWeather(): WeatherType {
    const random = Math.random()
    let cumulative = 0;

    for(const weather of weatherProbabilities){
        cumulative += weather.probability

        if(random < cumulative){
            return weather.type;
        }
    }

    return "sunny";
}

export function calculateSimulationData(festival: Festival): FestivalSimulation[] {
    const results: FestivalSimulation[] = []
    const maxCapacity = festival.stages.reduce((sum, s) => sum + s.capacity, 0)

    for(let day = 1; day<=festival.durationDays; day++){
        const weather = getRandomWeather();
        let costAttendanceMultiplier = 1

        if (festival.ticketCost > 200) costAttendanceMultiplier = 0.9
        if (festival.ticketCost < 80) costAttendanceMultiplier = 1.1

        const baseAttendance = Math.min(maxCapacity * ((0.6 + Math.random() * 0.4) + (festival.artists.length * 0.02) + (festival.vendors.length * 0.01)), maxCapacity);

        let attendance = baseAttendance * costAttendanceMultiplier

        if(weather === "sunny") attendance *= 1
        if(weather === "rain") attendance *= 0.8
        if(weather === "snow") attendance *= 0.9
        if(weather === "storm") attendance *= 0.5

        attendance = Math.min(Math.floor(attendance), maxCapacity);

        const ticketRevenue = attendance * festival.ticketCost;
        const vendorRevenue = attendance * festival.vendors.reduce((sum, v) => {
                const vendorEngagement = 0.3 + (Math.random() * 0.4);
                return sum + (v.revenuePerAttendee * vendorEngagement)
            }, 0);

        const crowdSatisfaction = calculateCrowdSatisfaction(festival, attendance, weather)

        results.push({
            day,
            attendance: Math.floor(attendance),
            maxCapacity,
            weather,
            ticketRevenue,
            vendorRevenue,
            crowdSatisfaction
        });
    }

    return results;
}

