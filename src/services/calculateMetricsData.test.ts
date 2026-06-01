import { attendeeWaterUsage, peoplePerMedic, peoplePerToilet, peoplePerVendor, speakersEnergyUsage, stageEnergyUsage, toiletsEnergyUsage, toiletWaterUsage, vendorsEnergyUsage } from "../constants/finance"
import { mockedFestival } from "../mocks/Festival/mockedFestival"
import { simulation } from "../mocks/Festival/mockedSimulation"
import { calculateMetricsData } from "./calculateMetricsData"

describe("Metric Data calculation tests", () => {
    
    test("calculates energy usage correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const expected = (
            (mockedFestival.stages.length * stageEnergyUsage * mockedFestival.durationDays) +
            (mockedFestival.speakers * speakersEnergyUsage * mockedFestival.durationDays) +
            (mockedFestival.vendors.length * vendorsEnergyUsage * mockedFestival.durationDays) +
            (mockedFestival.toilets * toiletsEnergyUsage * mockedFestival.durationDays)
        )

        expect(result.energyUsage).toBe(expected)
    })

    test("calculates water usage correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const avgAttendance = simulation.reduce((sum, d) => sum + d.attendance, 0)/simulation.length
        const expected = avgAttendance * attendeeWaterUsage + mockedFestival.toilets * toiletWaterUsage * mockedFestival.durationDays

        expect(result.waterUsage).toBe(expected)
    })

    test("calculates staff requirement correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const avgAttendance = simulation.reduce((sum, d) => sum + d.attendance, 0)/simulation.length

        const expected = Math.ceil(
            avgAttendance / 100 +
            mockedFestival.stages.length * 3 +
            mockedFestival.vendors.length * 2
        )

        expect(result.staffRequired).toBe(expected)
    })

    test("calculates medics requirement correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const avgAttendance = simulation.reduce((sum, d) => sum + d.attendance, 0)/simulation.length

        expect(result.medicsRequired).toBe(Math.ceil(avgAttendance / peoplePerMedic))
    })

    test("calculates vendor requirement correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const avgAttendance = simulation.reduce((sum, d) => sum + d.attendance, 0)/simulation.length

        const expected = Math.ceil(
            avgAttendance / peoplePerVendor + 
            mockedFestival.stages.length
        )

        expect(result.vendorsRequired).toBe(expected)
    })

    test("calculates staff coverage ratio correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        expect(result.totalStaffCoverage).toBeGreaterThanOrEqual(0)
    })

    test("calculates toilet requirement correctly", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        const avgAttendance = simulation.reduce((sum, d) => sum + d.attendance, 0)/simulation.length

        expect(result.toiletRequirement).toBe(Math.ceil(avgAttendance/peoplePerToilet))
    })

    test("crowd density risk is between 0 and 100", () => {
        const result = calculateMetricsData(mockedFestival, simulation)

        expect(result.crowdDensityRisk).toBeGreaterThanOrEqual(0)
        expect(result.crowdDensityRisk).toBeLessThanOrEqual(100)
    })
})