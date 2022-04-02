import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './style.css';
import axios from 'axios'

const Chart = () => {
    const [dailyData, setDailyData] = useState();

    useEffect(() => {
        const fetchMyAPI = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchMyAPI();
    }, []);


    // const lineChart = (
    //     dailyData.length ? (
    //         <Line
    //             data={{
    //                 labels: dailyData.map(({ date }) => date),
    //                 datasets: [{
    //                     data: dailyData.map((data) => data.confirmed),
    //                     label: 'Infected',
    //                     borderColor: 'red',
    //                     fill: true,
    //                 }, {
    //                     data: dailyData.map((data) => data.deaths),
    //                     label: 'Deaths',
    //                     borderColor: 'black',
    //                     backgroundColor: 'rgba(255, 0, 0, 0.5)',
    //                     fill: true,
    //                 }, {
    //                     data: dailyData.map((data) => data.recovered),
    //                     label: 'Recovered',
    //                     borderColor: 'green',
    //                     backgroundColor: 'rgba(0, 255, 0, 0.5)',
    //                     fill: true,
    //                 },
    //                 ],
    //             }}
    //         />
    //     ) : null
    // );



    return (
        <div className={styles.container}>
            {/* {lineChart} */}
        </div >
    );
};

export default Chart;