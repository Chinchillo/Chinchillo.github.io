import React from "react";
import 'd3-transition';
import { select } from 'd3-selection';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import words from "../data/words"


const WordCloud = (props) => {
    //hier kommen die entities mit der anzahl der umbenennungen rein


    console.log(props.data)

    return (

        <ReactWordcloud words={props.data} />

    );
}
export default WordCloud;