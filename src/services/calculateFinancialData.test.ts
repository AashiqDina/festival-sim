import { binsCost, medicsCost, speakersCost, toiletCost } from "../constants/finance"
import { mockedFestival } from "../mocks/Festival/mockedFestival"
import { simulation } from "../mocks/Festival/mockedSimulation"
import { calculateFinancialData } from "./calculateFinancialData"


describe("Financial data calculation tests", () => {

    test("calculates CAPEX correctly", () => {
        const result = calculateFinancialData(mockedFestival, simulation)

        const expectedCapex = (
            mockedFestival.artists.reduce((sum, a) => sum + a.cost, 0) + 
            mockedFestival.stages.reduce((sum, s) => sum + s.cost, 0) + 
            (toiletCost * mockedFestival.toilets) + (binsCost * mockedFestival.bins) + (speakersCost * mockedFestival.speakers)
        )

        expect(result.capex).toBe(expectedCapex)
    })

    test("calculates OPEX correctly with duration scaling", () => {
        const result = calculateFinancialData(mockedFestival, simulation)

        const dailyCost = (
            (mockedFestival.staff.reduce((sum, s) => sum + s.costPerDay, 0)) +
            (mockedFestival.vendors.reduce((sum, s) => sum + s.costPerDay, 0)) +
            medicsCost * mockedFestival.medics
        )

        const expectedOpex = dailyCost * mockedFestival.durationDays
        expect(result.opex).toBe(expectedOpex)
    })

    test("aggregates total revenue correctly", () => {

        const result = calculateFinancialData(mockedFestival, simulation)

        let expected = 0

        for(let day of simulation){
            expected += day.ticketRevenue
            expected += day.vendorRevenue
        }

        expect(result.totalRevenue).toBe(expected)
    })

    test("tracks vendor revenue separately", () => {
        const result = calculateFinancialData(mockedFestival, simulation)

        const expectedVendor = simulation.reduce((sum, s) => sum + s.vendorRevenue, 0)
        
        expect(result.totalVendorRevenue).toBe(expectedVendor)
    })

    test("handles empty simulation gracefully", () => {
        const result = calculateFinancialData(mockedFestival, [])

        expect(result.totalRevenue).toBe(0)
        expect(result.totalVendorRevenue).toBe(0)
    })
})