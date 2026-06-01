import { calculateCrowdSatisfaction } from "./calculateCrowdSatisfaction";
import { mockedFestival } from "../mocks/Festival/mockedFestival";

describe("Crowd Satisfaction calculation tests", () => {
    
    test("returns a score within bounds", () => {
        const score = calculateCrowdSatisfaction(mockedFestival, 500, "sunny");
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
    });

    test("weather hierarchy works corrects", () => {
        const sunny = calculateCrowdSatisfaction(mockedFestival, 500, "sunny");
        const cloudy = calculateCrowdSatisfaction(mockedFestival, 500, "cloudy");
        const rain = calculateCrowdSatisfaction(mockedFestival, 500, "rain");
        const snow = calculateCrowdSatisfaction(mockedFestival, 500, "snow");
        const storm = calculateCrowdSatisfaction(mockedFestival, 500, "storm");

        expect(sunny).toBeGreaterThanOrEqual(cloudy)
        expect(cloudy).toBeGreaterThan(snow)
        expect(snow).toBeGreaterThan(rain)
        expect(rain).toBeGreaterThan(storm)
    });

    test("low toilet ratio reduces satisfaction", () => {
        const goodToilets = {
            ...mockedFestival,
            toilets: 100,
        };

        const badToilets = {
            ...mockedFestival,
            toilets: 1,
        };

        const score = calculateCrowdSatisfaction(goodToilets, 5000, "sunny");
        const score2 = calculateCrowdSatisfaction(badToilets, 5000, "sunny")

        expect(score2).toBeLessThan(score);
    });

    test("overcrowding reduces satisfaction", () => {
        const score = calculateCrowdSatisfaction(mockedFestival, 950, "sunny");

        expect(score).toBeLessThan(calculateCrowdSatisfaction(mockedFestival, 700, "sunny"));
    });

    test("crowding reduces satisfaction", () => {
        const base = { // other values affected with attendace so...
            ...mockedFestival,
            stages: [{ id: "1", name: "Main", capacity: 1000, cost: 100 }],
            toilets: 100, 
            speakers: 10, 
            artists: [], 
            vendors: [], 
            medics: 100 
        };

        const lowCrowd = calculateCrowdSatisfaction(base, 400, "cloudy");
        const highCrowd = calculateCrowdSatisfaction(base, 950, "cloudy");

        expect(highCrowd).toBeLessThan(lowCrowd);
    });

    test("insufficient medics reduces satisfaction", () => {
        const lowMedics = {
            ...mockedFestival,
            medics: 0,
        };

        const score = calculateCrowdSatisfaction(lowMedics, 2000, "sunny");

        expect(score).toBeLessThan(calculateCrowdSatisfaction(mockedFestival, 2000, "sunny"));
    });

    test("more speakers increases satisfaction", () => {
        const low = calculateCrowdSatisfaction({ ...mockedFestival, speakers: 2 }, 500, "sunny");
        const high = calculateCrowdSatisfaction({ ...mockedFestival, speakers: 25 }, 500, "sunny");

        expect(high).toBeGreaterThan(low);
    });

    test("high ticket cost reduces satisfaction", () => {
        const expensiveFestival = {
            ...mockedFestival,
            ticketCost: 300,
        };

        const expensive = calculateCrowdSatisfaction(expensiveFestival, 500, "sunny");
        const cheap = calculateCrowdSatisfaction(mockedFestival, 500, "sunny");

        expect(expensive).toBeLessThan(cheap)
    });


})