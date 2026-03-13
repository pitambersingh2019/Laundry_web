import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const AverageRevenueChart = ({ series }: any) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    
    colors: ["#6c5899", "#d40617", "#e06914"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 8,
      
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    },
    yaxis: {
      tickAmount: 6,
      forceNiceScale: true,
      labels: {
        formatter: (val: number) => Math.round(val).toString(),
      },
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontWeight: 500,
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Average Revenue</h2>
        <span className="text-sm text-gray-400">This Year</span>
      </div>

      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default AverageRevenueChart;