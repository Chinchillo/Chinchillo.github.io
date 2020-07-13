import React from "react";
import 'd3-transition';
import { select } from 'd3-selection';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import words from "../data/words"


const WordCloud = (props) => {
    //hier kommen die entities mit der anzahl der umbenennungen rein

    function getCallback(callback) {

        return function (word, event) {
            const isActive = callback !== 'onWordMouseOut';
            const element = event.target;
            const text = select(element);
            text
                .on('click', () => {
                    if (isActive) {
                        window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank');
                    }
                })
                .transition()
                .attr('background', 'white')
                .attr('font-size', isActive ? '300%' : '100%')
                .attr('text-decoration', isActive ? 'underline' : 'none');
        };
    }

    const callbacks = {
        getWordColor: element => (element.category == "person" ? 'orange' : word.category == "date" ? "green" : 'purple'),
        getWordTooltip: word =>
            `The street name "${word.text}" appears ${word.number_value} times.`,
        onWordClick: getCallback('onWordClick'),
        onWordMouseOut: getCallback('onWordMouseOut'),
        onWordMouseOver: getCallback('onWordMouseOver'),
    };



    return (
        <ReactWordcloud callbacks={callbacks} words={props.data} />

    );
}
export default WordCloud;