import React from "react";
import 'd3-transition';
import { select } from 'd3-selection';
import ReactWordcloud from 'react-wordcloud';
import words from "../data/words"


const WordCloud = (props) => {
    // only get 40 most used entities for performance reasons
    const data = props.data.sort(function (a, b) {
        return b.value - a.value
    })
    const shortened = data.slice(0, 41)

    function getFont() {
        const style = getComputedStyle(document.body);
        const font = style.getPropertyValue("font-family");
        return font
    }


    function getCallback(callback) {
        return function (word, event) {
            const isActive = callback !== "onWordMouseOut";
            const element = event.target;
            const text = select(element);
            text
                .on("click", () => {
                    if (isActive) {
                        window.open(`https://pl.wikipedia.org/w/index.php?search=${word.text}`, "_blank");
                    }
                })

        };
    }
    const options = {
        fontFamily: getFont(),
        fontSizes: [30, 70],
        rotations: 0,
        padding: 1

    }

    const callbacks = {
        getWordColor: (word) => props.colors[word.category],
        getWordTooltip: (word) =>
            `The name "${word.text}" appears ${word.value} times.`,
        onWordClick: getCallback("onWordClick"),
        onWordMouseOver: getCallback("onWordMouseOver"),
        onWordMouseOut: getCallback("onWordMouseOut")
    };




    return (

        <ReactWordcloud words={shortened} callbacks={callbacks} options={options} />

    );
}
export default WordCloud;