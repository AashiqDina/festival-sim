export type User = {
    id: string,
    username: string,
    password: string,
    festivals: Festival[],
}

export type Festival = {
    id: string,
    name: string,
    artists: Artist[],
    stages: Stage[],
    vendors: Vendor[],
    staff: Staff[],
    toilets: number,
    bins: number
    speakers: number,
    medics: number,
    ticketCost: number
    durationDays: number
    result?: FestivalResult
}

export type FestivalResult = {
  simulation: FestivalSimulation[];
  finance: FestivalFinance;
  metrics: FestivalMetrics;
};

export type Artist = {
    id: string,
    name: string,
    cost: number,
}

export type Stage = {
    id: string,
    name: string,
    capacity: number,
    cost: number,
}

export type Vendor = {
    id: string
    name: string,
    // inventory?: VendorItem[]
    costPerDay: number,
    revenuePerAttendee: number,
}

// possibly add if theres time?
// export type VendorItem = { 
//     name: string,
//     quantity: number
// }

export type Staff = {
    id: string
    name: string,
    costPerDay: number,
}

export type FestivalSimulation = { // daily
    day: number,
    attendance: number,
    maxCapacity: number,
    weather: WeatherType,
    vendorRevenue: number,
    ticketRevenue: number,
    crowdSatisfaction: number,
}

export type WeatherType = "sunny"| "cloudy" | "rain" | "snow" | "storm"

export type FestivalFinance = { // is essentially a total
    capex: number, // total cost of the whole festical
    opex: number, // daily cost of the festival
    totalVendorRevenue: number,
    totalRevenue: number,
}

export type FestivalMetrics = {
    staffRequired: number,
    medicsRequired: number,
    vendorsRequired: number,
    toiletRequirement: number,

    energyUsage: number,
    waterUsage: number,

    totalStaffCoverage: number,
    crowdDensityRisk: number,
}

export type AuthContextType = {
    user: User | null,
    register: (username: string, password: string) => AuthResponse,
    login: (username: string, password: string) => AuthResponse,
    logout: () => void,
    updateUser: (user: User) => void
}

export type AuthResponse = {
    success: boolean,
    message?: string,
    user?: User
}

export type BannerData = {
    message: string,
    success?: boolean
    closeBanner: () => void,
}

