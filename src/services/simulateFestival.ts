import type { Festival, FestivalResult } from "../types";
import { calculateFinancialData } from "./calculateFinancialData";
import { calculateMetricsData } from "./calculateMetricsData";
import { calculateSimulationData } from "./calculateSimulationData";

export function simulateFestival(festival: Festival): FestivalResult{
    
    const simulation = calculateSimulationData(festival) 
    const finance = calculateFinancialData(festival, simulation)
    const metrics = calculateMetricsData(festival, simulation)

    return {
        simulation,
        finance,
        metrics
    }

}