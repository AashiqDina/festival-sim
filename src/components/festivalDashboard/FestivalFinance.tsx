import type { Festival, FestivalFinance } from "../../types"
import "./FestivalFinance.css"
import { MetricRow } from "./MetricRow"

type props = {
    festival: Festival
}

export default function FestivalFinance({festival}: props){

    if(!festival.result){
        return
    }

    const finance: FestivalFinance = festival.result.finance

    return (
        <div className="FinanceContainer">
            <h2>Finance</h2>
            <div className="FinanceData">
                <MetricRow label={"CAPEX"} value={`£${finance.capex}`}/>
                <MetricRow label={"OPEX"} value={`£${finance.opex}`}/>
                <MetricRow label={"Total Revenue"} value={`£${finance.totalRevenue.toFixed(2)}`}/>
                <MetricRow label={"Total Vendor Revenue"} value={`£${finance.totalVendorRevenue.toFixed(2)}`}/>
                <MetricRow label={"Profit"} value={`£${(finance.totalRevenue-(finance.capex+finance.opex)).toFixed(2)}`}/>                                                                    
            </div>
        </div>
    )
}