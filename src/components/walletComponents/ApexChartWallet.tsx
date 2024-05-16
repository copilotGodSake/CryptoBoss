import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import { WalletDataProps } from "../../pages/Wallet";
import axios from "axios";

interface Props {
  coin: WalletDataProps | undefined;
}
interface ApexChartProps {
  timestamp: Date;
  price: number;
}
type ApiResponse = ApexChartProps[];
// type SeriesType = { timestamp: number; price: number }[];
export const ApexChart = ({ coin }: Props) => {
  const [chartData, setChartData] = useState<ApiResponse>([]);
  const [timePeriod, setTimePeriod] = useState("all");
  const [series, setSeries] = useState<any[]>([{ data: [] }]);

  //set options for chart
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 250,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
      textAnchor: "middle",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(2);
        },
      },
    },
    markers: {
      size: 0,
      strokeWidth: 2,

      fillOpacity: 1,
      discrete: [],
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  });

  //get data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://openapiv1.coinstats.app/coins/${coin.id}/charts?period=${timePeriod}`,
          {
            headers: {
              accept: "application/json",
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        if (
          Array.isArray(response.data) &&
          response.data.every((item) => Array.isArray(item) && item.length >= 2)
        ) {
          setChartData(
            response.data.map((dataPoint) => ({
              timestamp: new Date(dataPoint[0] * 1000),
              price: dataPoint[1],
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [coin && coin.id]);

  //get series data for chart
  useEffect(() => {
    setSeries([
      {
        data: chartData.map((item) => [
          item.timestamp.getTime(),
          item.price.toFixed(),
        ]),
      },
    ]);
  }, [chartData]);

  //update data on click
  useEffect(() => {
    switch (timePeriod) {
      case "24h":
        const currentDay = new Date();
        const dayAgo = new Date();
        dayAgo.setHours(currentDay.getHours() - 24);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get 24 hours ago from now
          dayAgo.getTime(),
          currentDay.getTime()
        );
        break;
      case "1w":
        const currentWeek = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(currentWeek.getDate() - 7);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get one week ago from now
          weekAgo.getTime(),
          currentWeek.getTime()
        );
        break;
      case "1m":
        const currentDateMonth = new Date();
        const monthAgo = new Date();
        monthAgo.setMonth(currentDateMonth.getMonth() - 1);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get one month ago from now
          monthAgo.getTime(),
          currentDateMonth.getTime()
        );
        break;
      case "3m":
        const currentDateThreeMonth = new Date();
        const threeMonthAgo = new Date();
        threeMonthAgo.setMonth(currentDateThreeMonth.getMonth() - 3);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get 3 month ago from now
          threeMonthAgo.getTime(),
          currentDateThreeMonth.getTime()
        );
        break;
      case "6m":
        const currentDateSixMonth = new Date();
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(currentDateSixMonth.getMonth() - 6);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get 6 month ago from now
          sixMonthAgo.getTime(),
          currentDateSixMonth.getTime()
        );
        break;
      case "1y":
        const currentDateYear = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDateYear.getFullYear() - 1);
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          // get one year ago from now
          oneYearAgo.getTime(),
          currentDateYear.getTime()
        );
        break;
      case "all":
        let startDate;
        let endDate;
        if (chartData && chartData.length > 0) {
          startDate = new Date(chartData[0].timestamp).getTime();
        }
        if (chartData && chartData.length > 0) {
          endDate = new Date(
            chartData[chartData.length - 1].timestamp
          ).getTime();
        }

        ApexCharts.exec("area-datetime", "zoomX", startDate, endDate);
        break;
      default:
    }
  }, [timePeriod]);

  return (
    <>
      <div>
        <div id="chart">
          <div className="toolbar">
            <button
              id="24h"
              onClick={() => setTimePeriod("24h")}
              className={`p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ${timePeriod === "24h" ? "active" : ""}`}
            >
              24h
            </button>
            <button
              id="1w"
              onClick={() => setTimePeriod("1w")}
              className={`py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ${timePeriod === "one_month" ? "active" : ""}`}
            >
              1w
            </button>
            <button
              id="1m"
              onClick={() => setTimePeriod("1m")}
              className={`py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ${timePeriod === "one_month" ? "active" : ""}`}
            >
              1M
            </button>
            <button
              id="3m"
              onClick={() => setTimePeriod("3m")}
              className={`p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointers hover:bg-gray-500 ${timePeriod === "one_month" ? "active" : ""}`}
            >
              3M
            </button>
            <button
              id="6m"
              onClick={() => setTimePeriod("6m")}
              className={` p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer hover:bg-gray-500 ${timePeriod === "six_months" ? "active" : ""}`}
            >
              6M
            </button>
            <button
              id="1y"
              onClick={() => setTimePeriod("1y")}
              className={`py-[5px] px-[10px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer  hover:bg-gray-500 ${timePeriod === "one_year" ? "active" : ""}`}
            >
              1Y
            </button>
            <button
              id="all"
              onClick={() => setTimePeriod("all")}
              className={`p-[5px] bg-gray-300 text-white rounded-md mr-[10px] cursor-pointer hover:bg-gray-500  ${timePeriod === "all" ? "active" : ""}`}
            >
              ALL
            </button>
          </div>

          <div id="chart-timeline">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={250}
            />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    </>
  );
};
