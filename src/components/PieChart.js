import React from "react";


import { PieChart } from 'react-minimal-pie-chart';


const MyPieChart = (props) => {
    //hier kommen die kategorien mit der anzahl der umbenennungen



    return (


        <PieChart
            data={[
                { title: 'One', value: 10, title: "people", color: '#E38627' },
                { title: 'Two', value: 15, title: "dates", color: '#C13C37' },
                { title: 'Three', value: 20, title: "other entities", color: '#6A2135' },
                { title: "Four", value: 10, title: "misc", color: "#6A2111" }
            ]}
        //label={({ dataEntry }) => dataEntry.title}
        />)
}
export default MyPieChart;