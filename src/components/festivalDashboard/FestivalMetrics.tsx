import type { Festival, FestivalMetrics } from "../../types"
import { getRiskLabel } from "../../utils/getRiskLabel";
import "./FestivalMetrics.css"
import { MetricRow } from "./MetricRow";

type props = {
    festival: Festival;
}

export default function FestivalMetrics({festival}: props){
    
    if(!festival?.result) return 

    const metrics: FestivalMetrics = festival.result.metrics

    return (
        <div className="MetricsContainer">
            <h2>Metrics</h2>
            <div className="MetricsData">
                <MetricRow label={"Staff Required"} value={metrics.staffRequired}/>
                <MetricRow label={"Medics Required"} value={metrics.medicsRequired}/>
                <MetricRow label={"Vendors Required"} value={metrics.vendorsRequired}/>
                <MetricRow label={"Total Staff Coverage"} value={(metrics.totalStaffCoverage*100).toFixed(2)}/>
                <MetricRow label={"Toilets Required"} value={metrics.toiletRequirement}/>
                <MetricRow label={"Energy Usage"} value={`${metrics.vendorsRequired}kWh`}/>
                <MetricRow label={"Water Usage"} value={`${metrics.vendorsRequired} Litres`}/>
                <MetricRow label={"Crowd Density Risk"} value={getRiskLabel(metrics.crowdDensityRisk)}/>                                       
            </div>
        </div>
    )
}