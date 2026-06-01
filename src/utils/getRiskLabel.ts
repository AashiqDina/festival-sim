export function getRiskLabel(risk: number): string {
    if(risk < 5) return "No Risk"
    if(risk < 20) return "Low Risk";
    if(risk < 50) return "Moderate Risk";
    if(risk < 75) return "High Risk";
    return "Critical Risk";
}