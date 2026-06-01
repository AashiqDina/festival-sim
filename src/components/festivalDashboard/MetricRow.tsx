import "./MetricRow.css"

type MetricRowProps = {
    label: string;
    value: string | number;
};

export function MetricRow({ label, value }: MetricRowProps) {
    return (
        <h3 className="MetricsRow">
            {label} <span>{value}</span>
        </h3>
    );
}