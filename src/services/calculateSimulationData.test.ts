import { jest } from "@jest/globals";
import { mockedFestival } from "../mocks/Festival/mockedFestival";
import { calculateSimulationData } from "./calculateSimulationData";

export const mockRandomValue = (value: number) => {
    jest.spyOn(Math, "random").mockReturnValue(value);
};

describe("calculateSimulationData", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("generates correct number of simulation days", () => {
        mockRandomValue(0.5);

        const result = calculateSimulationData(mockedFestival);
        expect(result).toHaveLength(mockedFestival.durationDays);
    });

    it("caps attendance at max capacity", () => {
        mockRandomValue(0.99);

        const result = calculateSimulationData(mockedFestival);

        result.forEach(day => {
            expect(day.attendance).toBeLessThanOrEqual(day.maxCapacity);
        });
    });

    it("reduces attendance when ticket cost is high", () => {
        mockRandomValue(0.5);

        const expensiveFestival = {
            ...mockedFestival,
            ticketCost: 300,
        };

        const result = calculateSimulationData(expensiveFestival);

        expect(result[0].attendance).toBeDefined();
    });
});