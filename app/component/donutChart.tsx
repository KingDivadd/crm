'use client'
import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const DoughnutChart: React.FC = () => {
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
        <div style={{ height: '18rem', width: '100%', minWidth: '20rem', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
                data={{
                    labels: [
                        'Other Services',
                        'Suspension Inspection and replacement',
                        'Engine Inspection and Service (Oil Change)',
                        'Tire / Wheel Inspection and replacement',
                        'Braking System Inspection and Repair'
                    ],
                    datasets: [{
                        data: [30, 70, 30, 30, 40],
                        backgroundColor: [
                            '#154EB7',
                            '#0A275C',
                            '#0F3A8A',
                            '#5E90ED',
                            '#1B61E4',
                        ],
                        hoverOffset: 4
                    }]
                }}

                options={{
                    maintainAspectRatio: false, // Set to false to prevent maintaining aspect ratio
                    plugins: {
                        legend: {
                            display: false, // Hide the legend
                        },
                    },
                }}
                width={chartDimensions.width}
                height={chartDimensions.height}
            />
        </div>
    );
};

export default DoughnutChart;
