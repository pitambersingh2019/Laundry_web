import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const CustomerDonutChart = ({ series, labels }: any) => {
  if (!series || series.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 h-[280px] flex items-center justify-center text-gray-400">
        No customers yet
      </div>
    );
  }

  const options: ApexOptions = {
    chart: { type: "donut" },
    labels,
    colors: ["#584abd", "#089442"],
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontSize: "12px",
      markers: { size: 11 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: false,
            },
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-6">Customer Statistics</h3>
      <Chart options={options} series={series} type="donut" height={260} />
    </div>
  );
};

export default CustomerDonutChart;