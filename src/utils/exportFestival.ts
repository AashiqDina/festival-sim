import type { Festival } from "../types";

export function exportFestivalJSON(festival: Festival) {
    if (!festival.result) return;

    const data = {
        festival
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${festival.name}_simulation.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

export function exportFestivalCSV(festival: Festival) {
    if (!festival.result) return;

    const rows = [
        [
            "Day",
            "Attendance",
            "Max Capacity",
            "Weather",
            "Ticket Revenue",
            "Vendor Revenue",
            "Crowd Satisfaction"
        ],
        ...festival.result.simulation.map(day => [
            day.day,
            day.attendance,
            day.maxCapacity,
            day.weather,
            day.ticketRevenue,
            day.vendorRevenue,
            day.crowdSatisfaction
        ])
    ];

    const csv = rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${festival.name}_simulation.csv`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}