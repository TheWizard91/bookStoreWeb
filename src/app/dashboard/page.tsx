"use client";

import { useState, useRef, useEffect } from "react";
import MainBody from "./mainbody";
import Nav from "./nav"

// import 'semantic-ui-css/semantic.min.css'

const Dashboard = () => {

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        try {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            // console.log("win: "+window.innerWidth+", height: "+height);
        } catch (error) {
            console.log("Error: "+error);
        }
        return () => {
            console.log("in App... Failed");
        };
    }, [height]);

    return (
        <center>
            <Nav height={height} width={width} />
            <MainBody />
        </center>
    )
}

export default Dashboard;