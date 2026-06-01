import { attendeeWaterUsage, peoplePerMedic, peoplePerToilet, peoplePerVendor, speakersEnergyUsage, stageEnergyUsage, toiletsEnergyUsage, toiletWaterUsage, vendorsEnergyUsage } from "../constants/finance";
import type { Festival, FestivalSimulation, FestivalMetrics } from "../types";

export function calculateMetricsData(festival: Festival, simulationData: FestivalSimulation[]): FestivalMetrics{

    const totalAttendance = simulationData.reduce((sum, day) => sum + day.attendance, 0)
    const avgAttendance = totalAttendance/simulationData.length
    const maxCapacity = festival.stages.reduce((sum, s) => sum + s.capacity, 0)

    const energyUsage = // units => kWh
        ((festival.stages.length * stageEnergyUsage) * festival.durationDays) +
        ((festival.speakers * speakersEnergyUsage) * festival.durationDays) +
        ((festival.vendors.length * vendorsEnergyUsage) * festival.durationDays) +
        ((festival.toilets * toiletsEnergyUsage) * festival.durationDays)

    const staffRequired = Math.ceil(
        avgAttendance / 100 +
        festival.stages.length * 3 + 
        festival.vendors.length * 2
    );

    const medicsRequired = Math.ceil(avgAttendance/peoplePerMedic); // st least medic for every 300 people
    const vendorsRequired = Math.ceil(
        avgAttendance/peoplePerVendor + 
        festival.stages.length
    ); // at least one vendor for every 200 people

    const totalStaffAvailable = festival.staff.length + festival.vendors.length + festival.medics
    const totalStaffCoverage = totalStaffAvailable/(staffRequired + medicsRequired + vendorsRequired);

    const toiletRequirement = Math.ceil(avgAttendance/peoplePerToilet); // at least 1 toilet for every 70 people
    
    const avgCapacityUtilisation = avgAttendance / maxCapacity;
    const badWeatherDays = simulationData.filter(
        d => d.weather === "rain" || d.weather === "storm"
    ).length;

    let crowdDensityRisk = Math.max(0, (avgCapacityUtilisation - 0.7)) * 100; // if more than 70% it could be a risk
    crowdDensityRisk += (badWeatherDays / simulationData.length) * 10; // take into account  bad weather to increase risk if there is
    crowdDensityRisk = Math.min(100, crowdDensityRisk);

    const waterUsage = avgAttendance * attendeeWaterUsage + (festival.toilets * toiletWaterUsage * festival.durationDays);

    return {
        energyUsage,
        staffRequired,
        medicsRequired,
        vendorsRequired,
        totalStaffCoverage,
        toiletRequirement,
        crowdDensityRisk,
        waterUsage,
    };
}