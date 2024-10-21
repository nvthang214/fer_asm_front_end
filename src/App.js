import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
        },
        series: [30, 40, 45, 50, 49, 60, 70, 91],
        label: ["A", "B", "C", "D", "E", "F", "G", "H"],
    });

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="donut"
                        width="500"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
