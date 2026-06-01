import type { Festival, FestivalFinance, FestivalSimulation } from "../types";
import { binsCost, medicsCost, speakersCost, toiletCost } from "../constants/finance";

export function calculateFinancialData(festival: Festival, simulationData: FestivalSimulation[]): FestivalFinance{
    
    // single cost for capex
    const artistCost = (festival.artists.reduce((sum, a) => sum + a.cost, 0))
    const stageCost = festival.stages.reduce((sum, s) => sum + s.cost, 0)

    // daily cost for opex
    const staffCost = festival.staff.reduce((sum, s) => sum + s.costPerDay, 0)
    const vendorCost = festival.vendors.reduce((sum, v) => sum + v.costPerDay, 0)

    const capex = artistCost + stageCost + (toiletCost * festival.toilets) + (binsCost * festival.bins) + (speakersCost * festival.speakers)
    const opex = (staffCost + vendorCost + (festival.medics * medicsCost)) * festival.durationDays 

    let totalVendorRevenue = 0;
    let totalRevenue = 0

    for (let i = 0; i < simulationData.length; i++) {

        const dailyTicketRevenue = simulationData[i].ticketRevenue
        const dailyVendorRevenue = simulationData[i].vendorRevenue

        totalRevenue += dailyTicketRevenue + dailyVendorRevenue
        totalVendorRevenue += dailyVendorRevenue;
    }

    return{
        capex,
        opex,
        totalVendorRevenue,
        totalRevenue
    }
}