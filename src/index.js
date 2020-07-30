import Header_Contents from "../src/js/components/header"
import Full_Content from "../src/js/components/body"
import React from "react";
import ReactDOM from "react-dom";

//This is going to be the main file for my other javascript functions
//Using two ReactDOM.renders because I've no clue how to do this within one render
//I couldn't understand how to use "useContext" while changing the original value of the array so I gave up and pushed everything to one file


ReactDOM.render(
    <Full_Content/>,
    document.querySelector('.baseCont')
)