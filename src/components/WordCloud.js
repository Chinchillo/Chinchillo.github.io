import React from "react";
import 'd3-transition';
import { select } from 'd3-selection';
import ReactWordcloud from 'react-wordcloud';
import words from "../data/words"


const WordCloud = (props) => {
    console.log(props.colors)
    function getFont() {
        const style = getComputedStyle(document.body);
        const font = style.getPropertyValue("font-family");
        console.log(font);
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
                        window.open(`https://pl.wikipedia.org/w/index.php?search=${word.wiki_title}`, "_blank");
                    }
                })
                .transition()
                .attr("background", "white")
                .attr("font-size", isActive ? "300%" : "100%")
                .attr("text-decoration", isActive ? "underline" : "none");
        };
    }
    const options = {
        fontFamily: getFont(),
        fontSizes: [30, 68],
        rotationAngles: [0, 90],
        spiral: "archimedean",
        padding: 1

    }

    const callbacks = {
        getWordColor: (word) => props.colors[word.category],
        getWordTooltip: (word) =>
            `The name "${word.text}" appears ${word.value} times.`,
        onWordClick: getCallback("onWordClick"),
        onWordMouseOut: getCallback("onWordMouseOut"),
        onWordMouseOver: getCallback("onWordMouseOver")
    };




    return (

        <ReactWordcloud words={props.data} callbacks={callbacks} options={options} />

    );
}
export default WordCloud;