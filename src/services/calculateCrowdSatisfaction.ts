import type { Festival, WeatherType } from "../types";

export function calculateCrowdSatisfaction(festival: Festival, attendance: number, weather: WeatherType): number {

    let score = 100

    if (weather === "sunny") score += 5
    if (weather === "cloudy") score += 0
    if (weather === "rain") score -= 20
    if (weather === "snow") score -= 10
    if (weather === "storm") score -= 50

    const toiletEach = attendance/(festival.toilets || 1)

    if (toiletEach > 80) score -= 30
    else if (toiletEach > 50) score -= 15
    else if (toiletEach > 30) score -= 5
    else score += 5;

    if (festival.speakers < 5) score -= 10
    else if (festival.speakers > 20) score += 10

    const maxCapacity = festival.stages.reduce((sum, s) => sum + s.capacity,0)
    if (attendance > maxCapacity * 0.9) score -= 20
    if (attendance < maxCapacity * 0.5) score -= 5

    score += Math.min(festival.artists.length * 2, 15)
    score += Math.min(festival.vendors.length * 1.5, 10)

    const requiredMedics = Math.ceil(attendance/250)

    if (festival.medics < requiredMedics) score -= 15
    else score += 5

    if (festival.ticketCost > 200) score -= 10;
    if (festival.ticketCost < 80) score += 5;

    return Math.max(0, Math.min(100, score));
}