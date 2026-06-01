import type { FestivalSimulation } from "../../types";

export const simulation: FestivalSimulation[] = [
  {
    day: 1,
    attendance: 100,
    maxCapacity: 1000,
    weather: "sunny",
    ticketRevenue: 1000,
    vendorRevenue: 500,
    crowdSatisfaction: 80,
  },
  {
    day: 2,
    attendance: 200,
    maxCapacity: 1000,
    weather: "rain",
    ticketRevenue: 2000,
    vendorRevenue: 1000,
    crowdSatisfaction: 70,
  },
];