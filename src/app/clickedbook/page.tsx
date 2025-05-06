/* eslint-disable @next/next/no-img-element */

"use client"

// Component receiving data
import { useSearchParams, usePahtname, useRouter, Router } from 'next/navigation';
import "../../css/clickedbook.css";
import 'semantic-ui-css/semantic.min.css'
//https://stackoverflow.com/questions/76350426/how-to-pass-state-or-props-using-router-push-from-navigation-next-js-13
// import { useRouter } from 'next/navigation'
import { Tooltip, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { useEffect, useState, useRef } from "react"
import { StarIcon } from "./icons/staricon";

// import { useBook } from "../../hooks/usebook";
// import { BookData } from "../classes/dataclasses/bookData";

const ClickedBook = ({searchParams: string}) => {
    const colors = new Map<String, String> ([
        ["bluePastel", "#8EACCD"],
        ["pastelVioletl", "E5D9F2"]
    ])

    const bluePastel = useRef("#8EACCD");
    const pastelVioletl = useRef("#E5D9F2");
    const yellowPastel = useRef("FFF7D1");

    const fetchBook=useSearchParams();
    const book=fetchBook.get("book")
    const [mapOfBook, setTheMapOfBook] = useState(new Map())
    // console.log("anguria: "+book)
    // console.log("orange: "+searchParams.book)

    let buyItNowHREF="/buyitnow/"
    const router = useRouter(buyItNowHREF)

    function createTheMapOfBooks () {
        let bookInArrayForm = book.slice(1,book.length-1).split(",")
        let m = new Map()
        // This works.
        for(let i=0;i<bookInArrayForm.length;i++){
            let currentKey=bookInArrayForm[i].split(":")[0]
            if(
                currentKey==='"title"' ||
                currentKey==='"author"' ||
                currentKey==='"publicationYear"' ||
                currentKey==='"description"' ||
                currentKey==='"longDescription"' ||
                currentKey==='"price"' ||
                currentKey==='"rates"'
            ){
                let e=bookInArrayForm[i].split(":")
                let key=e[0]
                let value=e[1]
                let keyWithoutQuotes=key.slice(1,key.length-1)
                let valueWithoughtQuotes=value.slice(1,value.length-1)
                m.set(keyWithoutQuotes,valueWithoughtQuotes)
            }else{
                if(currentKey==='"genres"'){
                    let e=bookInArrayForm[i].split(":")
                    let value=e[1]
                    let valueWithoughtQuotes=value.slice(1,value.length-1)
                    m.set("genres",value)
                }else if(currentKey==='"coverImage"'){
                    let str=bookInArrayForm[i]
                    let imageURIWithoutQuotes=str.slice("coverImage:".length+3,str.length-1)
                    m.set("coverImage",imageURIWithoutQuotes)
                }else if(currentKey==='"stockCoverImagePath"'){
                    let str=bookInArrayForm[i]
                    let imageURIWithoutQuotes=str.slice("stockCoverImagePath:".length+3,str.length-1)
                    m.set("stockCoverImagePath",imageURIWithoutQuotes)
                }else if(bookInArrayForm[i].split(":")[0].includes("]") && typeof bookInArrayForm[i].split(":")[1]==="undefined"){
                    m.set("genres",m.get("genres")+","+bookInArrayForm[i].split(":")[0])
                }else if(currentKey==='"localCoverImagePath"'){
                    m.set("localCoverImagePath","By the dev. this is the same as the stock image path.")
                }else if(currentKey==='"id"'){
                    m.set("id",bookInArrayForm[i].split(":")[1])
                }else if(!bookInArrayForm[i].split(":")[0].includes("]") && typeof bookInArrayForm[i].split(":")[1]==="undefined"){
                    m.set("longDescription",m.get("longDescription")+bookInArrayForm[i].split(":")[0])
                }
            }
        }
        setTheMapOfBook(m)
        // The two maps are empty still
        // console.log("apple: "+JSON.stringify(bookInArrayForm))
        // console.log("orange: "+JSON.stringify(m))
        // console.log('mango: '+JSON.stringify(mapOfBook))
    }
    
    function genresRevisited(gen:string) {
        if(gen.includes("[")){
            gen=gen.replace("[","")
            gen=gen.slice(1,gen.length-1)
        }else{
            gen=gen.replace("]","")
            gen=gen.slice(1,gen.length-1)
        }
        return gen
    }

    const handleOnBuyItNowButton = (e) => {
        e.preventDefault()
        let m={}
        mapOfBook.forEach((v,k)=>{
            // console.log("(k,v) "+k+": "+v)
            m[k]=v
        })
        router.push(buyItNowHREF + "?" + createQueryString("mapOfBook", JSON.stringify(m)))
        
    }

    const createQueryString = (name, value) => {
        /**Preparing map to be sent to the ne4xt component. */
        const params = new URLSearchParams()
        params.set(name, value)
        return params.toString()
    }

    useEffect(() => {
        /**Need this becase it takes care of the problem with re-rendering. */

        // This works -- it shows info to card
        createTheMapOfBooks()
    }, [0]);

    return (

        <center>
            <h1>{mapOfBook.get("title")}</h1>
                <div 
                    className="ui card"
                    id="myCard"
                    style={{
                        height:"fit-content",
                        width:"400px",
                        borderRadius:"25px",
                        border:"2px solid "+ bluePastel.current,        
                    }}>
                    <div className="column"
                        id="bookImageSection"
                        style={{
                            alignItems:"center",
                            justifyContent: "center"
                        }}>
                            <div className="">
                                <img 
                                    className="ui image" 
                                    src={mapOfBook.get("coverImage") ? mapOfBook.get("coverImage") : mapOfBook.get("stockImage")} 
                                    style={{
                                        height:"200px",
                                        width:"150px",
                                        borderRadius:"15px",
                                        margin:"10% 15px 15px"}}//50% if mobile
                                    alt="books image"
                                    id="object-cover" />
                            </div>
                    </div>
                    <div className="column" 
                        id="columnForDescriptionAndButtonSection" 
                        style={{
                            margin:"16px",
                            // marginBottom: "8px"
                            width:"fitContent"
                        }}>
                        <div className="row" id="descriptionSection" style={{marginBottom: "16px", width:"100%"}}>
                            <div className="column" id="textRowInnerColumnSection" style={{width:"100%"}}>
                                <div 
                                    className="ui card" 
                                    id="cardOfDescription"
                                    style={{
                                        height: "-webkit-fill-available",
                                        width:"fitContent%",
                                        backgroundColor: "#FFFFE3",//#E8DCCA #F5F5DC
                                        border: "thick solid #E8DCCA",
                                    }}>
                                        <div 
                                            className="ui card-header"
                                            id="descriptionTitleAndPrice"
                                            style={{
                                                marginBottom:"14px"}}>
                                                <div 
                                                    className="row" 
                                                    style={{
                                                        display: "flex", 
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        height:"30px"}}>
                                                        <h3 style={{marginBottom:"0px"}}>Description</h3>
                                                        <strong>${mapOfBook.get("price")}</strong>
                                                </div>
                                        </div>
                                        <div 
                                            className="ui card-body" 
                                            id="bodyWithinTheDescriptionSection"
                                            style={{height:"50%"}}>
                                                <p
                                                    id="ragargaphOfDescription"
                                                    style={{
                                                        height:"100%",}}
                                                        >{mapOfBook.get("description")}</p>
                                        </div>
                                        <div className="ui card-footer">
                                            <div id="byTag" style={{display:"ruby"}}>
                                                <strong className="">By: </strong><p>{mapOfBook.get("author")}</p>
                                            </div>
                                            <div>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </div>
                                            <div className="ui card-group" id="genresListSection" style={{display:"inline-flex", paddingBottom: "8px"}}>
                                                {/* {mapOfBook.get("genres").split(",") && mapOfBook.get("genres").split(",").map((gens,k) => (
                                                    // eslint-disable-next-line react/jsx-key
                                                    <div className="lis" id="genresList">
                                                        <div className="ui cards" id="genresCards">
                                                            <div className="ui card" 
                                                                id="genresSingleCard"
                                                                style={{
                                                                    width: "auto",
                                                                    margin: "10px",
                                                                    backgroundColor: pastelVioletl.current,
                                                                    padding: "5px",
                                                                    borderRadius: "5px",
                                                                    border: "2px solid "+bluePastel.current,}}>
                                                                <p 
                                                                    style={{
                                                                        margin:"0px",
                                                                        color:"#295F98",}}
                                                                    id="genre">{genresRevisited(gens)}</p>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                ))} */}
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="buttonRow">
                            <button 
                                className="buyItNow"
                                id="buyItNowButton"
                                type="button"
                                onClick={handleOnBuyItNowButton}
                                >Buy it now.
                            </button>
                        </div>
                    </div>
                </div>
        </center>
    )
}

export default ClickedBook;