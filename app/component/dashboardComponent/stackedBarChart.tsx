'use client'
import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale);

const SalesAnalyticsBarChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartDimensions, setChartDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const resizeHandler = () => {
            const parentWidth = (chartRef.current?.parentNode as HTMLElement)?.clientWidth || 0;
            const parentHeight = (chartRef.current?.parentNode as HTMLElement)?.clientHeight || 0;
            setChartDimensions({ width: parentWidth, height: parentHeight });
        };

        window.addEventListener("resize", resizeHandler);

        // Call resizeHandler once to set initial size
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <div
            style={{ width: "100%", height: "16rem" }}
            ref={chartRef}
        >
            <Bar
                data={{
                    labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                    datasets: [
                        {
                            label: 'Leads',
                            data: [65, 59, 70, 81, 56, 55, 40],
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgb(255, 99, 132)",
                            borderWidth: 1,
                        },
                        {
                            label: 'Sales',
                            data: [28, 48, 40, 19, 86, 27, 90],
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgb(54, 162, 235)",
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                        },
                    },
                }}
                width={chartDimensions.width}
                height={chartDimensions.height}
            />
        </div>
    );
};

export default SalesAnalyticsBarChart;
