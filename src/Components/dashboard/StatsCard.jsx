export default function StatsCard({
    title,
    value,
    icon,
    bg,
    ringBg,
    borderColor,
    iconBg,
    arrow,
    trendColor = "text-green-600",
}) {
    return (
        <div
            className={`flex flex-col gap-1.5 p-4 rounded-sm overflow-hidden items-start rounded-md relative ${bg}`}
        >
            <span
                className={`h-[95px] w-[95px] rounded-full absolute -top-8 -right-8 ring-[20px] ${ringBg}`}
            ></span>
            <div
                className={`w-8 h-8 grid place-content-center rounded-full border border-dashed ${borderColor}`}
            >
                {icon && (
                    <span
                        className={`h-6 w-6 rounded-full grid place-content-center ${iconBg} text-white`}
                    >
                        {icon}
                    </span>
                )}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-700">
                {title}
            </span>
            <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">
                    {value}
                </span>
                <span className={trendColor}>{arrow}</span>
            </div>
        </div>
    );
}