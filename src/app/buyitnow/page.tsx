/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import "semantic-ui-css/semantic.min.css"

import { useSearchParams} from "next/navigation"
import { Tooltip, Button } from "@nextui-org/react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"

import { useEffect, useState, useRef, useCallback } from "react"
import ReactDOM from "react-dom";
// import styled from 'styled-components';

const BuyItNow = ({searchParams: string}) => {
    //TODO: Price is undefined when I try to render it.

    const fetchBook = useSearchParams()
    const book=fetchBook.get("mapOfBook")
    // console.log("potato"+JSON.stringify(searchParams.mapOfBook))
    // console.log("spinach: "+book)

    let arrOfPaymentOptions=["paypal","americanExpress","stripe","visa","master"]
    let arrOfIconNamesForPaymentOptions=["cc paypal icon","cc amex icon","cc stripe icon","cc visa icon","cc mastercard icon"]
    let arrForTableCecheoutDescription=["Item(1)","Shipping","Tax","Order total"]
    const [mapOfReceipt, setMapOfReceipt]=useState({})
    const [mapOfPyamentOptions, setMapOfPyamentOptions]=useState({})
    const [mapOfBook, setTheMapOfBook]=useState(new Map())

    const title=useRef("")
    const author=useRef("")
    const publicationYear=useRef("")
    const description=useRef("")
    const longDescription=useRef("")
    const price=useRef("")
    const rates=useRef("")
    const genres=useRef("")
    const coverImage=useRef("")
    const stockCoverImagePath=useRef("")
    const localCoverImagePath=useRef("")
    const id=useRef("")
    // const valueOfClickedRadioButton=useRef("")
    const [valueOfClickedRadioButton,setValueOfClickedRadioButton]=useState("master")

    const orderTotalStyleFirstOption=useRef({
        display: "flex",
        justifyContent: "space-between",
        marginTop:"0px",
        fontWeight:"normal",
        fontSize:"16px"
    })
    const orderTotalStyleSecondOption=useRef({
        display: "flex",
        justifyContent: "space-between",
        marginTop:"16px",
        fontWeight:"bold",
        fontSize:"16px"
    })

    function populateVars (k:String, v:String) {
        if(k==="title")
            title.current=v
        else if(k==="author")
            author.current=v
        else if(k==="publicationYear")
            publicationYear.current=v
        else if(k==="description")
            description.current=v
        else if(k==="longDescription")
            longDescription.current=v
        else if(k==="price")
            price.current=v
        else if(k==="rates")
            rates.current=v
        else if(k==="genres")
            genres.current=v
        else if(k==="coverImage")
            coverImage.current=v
        else if(k==="stockCoverImagePath")
            stockCoverImagePath.current=v
        else if(k==="localCoverImagePath")
            localCoverImagePath.current=v
        else if(k==="longDescription")
            longDescription.current=v
        else
            id.current=v;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function createTheMapOfBooks () {
        let bookInArrayForm = book.slice(1,book.length-1).split(",")
        // console.log("a: "+JSON.stringify(bookInArrayForm))
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
                populateVars(keyWithoutQuotes,valueWithoughtQuotes)
            }else{
                if(currentKey==='"genres"'){
                    let e=bookInArrayForm[i].split(":")
                    let value=e[1]
                    let valueWithoughtQuotes=value.slice(1,value.length-1)
                    m.set("genres",value)
                    populateVars("genres",valueWithoughtQuotes)
                }else if(currentKey==='"coverImage"'){
                    let str=bookInArrayForm[i]
                    let imageURIWithoutQuotes=str.slice("coverImage:".length+3,str.length-1)
                    m.set("coverImage",imageURIWithoutQuotes)
                    populateVars("coverImage",imageURIWithoutQuotes)
                }else if(currentKey==='"stockCoverImagePath"'){
                    let str=bookInArrayForm[i]
                    let imageURIWithoutQuotes=str.slice("stockCoverImagePath:".length+3,str.length-1)
                    m.set("stockCoverImagePath",imageURIWithoutQuotes)
                    populateVars("stockCoverImagePath",imageURIWithoutQuotes)
                }else if(bookInArrayForm[i].split(":")[0].includes("]") && typeof bookInArrayForm[i].split(":")[1]==="undefined"){
                    m.set("genres",m.get("genres")+","+bookInArrayForm[i].split(":")[0])
                    populateVars("genres",m.get("genres")+","+bookInArrayForm[i].split(":")[0])
                }else if(currentKey==='"localCoverImagePath"'){
                    m.set("localCoverImagePath","By the dev. this is the same as the stock image path.")
                    populateVars("localCoverImagePath","By the dev. this is the same as the stock image path.")
                }else if(currentKey==='"id"'){
                    m.set("id",bookInArrayForm[i].split(":")[1])
                    populateVars("id",bookInArrayForm[i].split(":")[1])
                }else if(!bookInArrayForm[i].split(":")[0].includes("]") && typeof bookInArrayForm[i].split(":")[1]==="undefined"){
                    m.set("longDescription",m.get("longDescription")+bookInArrayForm[i].split(":")[0])
                    populateVars("longDescription",m.get("longDescription")+bookInArrayForm[i].split(":")[0])
                }
            }
        }
        return setTheMapOfBook(m)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function createTheMapOfReceipt () {
        const m={}
        console.log("size: "+mapOfBook.size)
        console.log("mapOfBookze: "+JSON.stringify(mapOfBook))
        mapOfBook.forEach(element => {
            console.log("e: "+element)
        });
        for(let i=0;i<arrForTableCecheoutDescription.length;i++){
            if(arrForTableCecheoutDescription[i]==="Item(1)"){
                if(m[mapOfBook["price"]]!=="undefined")
                    m[arrForTableCecheoutDescription[i]]=price.current//mapOfBook.get("price")
                else
                    m[arrForTableCecheoutDescription[i]]="200"
            }else if(arrForTableCecheoutDescription[i]==="Shipping"){
                m[arrForTableCecheoutDescription[i]]=Math.floor(Math.random()*10)
            }else if(arrForTableCecheoutDescription[i]==="Tax"){
                m[arrForTableCecheoutDescription[i]]=Math.floor(Math.random()*10)
            }else{
                m[arrForTableCecheoutDescription[3]]=parseInt(m[arrForTableCecheoutDescription[0]])+
                                                        parseInt(m[arrForTableCecheoutDescription[1]])+
                                                        parseInt(m[arrForTableCecheoutDescription[2]])
            }
        }
        setMapOfReceipt(m)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function createTheMapOfPayments () {
        let m={}
        for(let i=0;i<arrOfIconNamesForPaymentOptions.length;i++){
            m[arrOfPaymentOptions[i]]=arrOfIconNamesForPaymentOptions[i]
        }
        setMapOfPyamentOptions(m)
    }

    function changeOrderTotalStyle(i){
        // if(el==="Order total"){
            orderTotalStyle.current={
                display: "flex",
                justifyContent: "space-between",
                marginTop:"16px",
                fontWeight:"bold",
                fontSize:"16px"
            }
        // }
    }

    const handleChekedButton =(e)=>{
        e.preventDefault()
        console.log("pressed")
    }

    const handleConfirmAndPayButton =()=> {
        // e.preventDefault()
        console.log("pressed in confirm and pay")
    }

    // const handleRabioButton =(name:String)=> {
        
    //     valueOfClickedRadioButton.current=name
    //     console.log("name:"+name)
    //     console.log("valueOfClickedRadioButton:"+valueOfClickedRadioButton.current)
    // }

    const onHandleApplyButton =()=>{}


    useEffect(() => {
        createTheMapOfBooks()
        createTheMapOfPayments()
        createTheMapOfReceipt()
        // handleRabioButton()
    }, [])

    return(
        <div 
            className="some"
            style={{
                width:"100%", 
                display:"flex",
                justifyContent: "space-around"}}>
            <center
                className=""
                style={{height:"100%",width:"1300px"}}>
                    <div>
                        <header><h1 style={{fontSize:"36px"}}>Checkout</h1></header>
                    </div>
                    <div 
                        className="ui card"
                        style={{
                            backgroundColor:"#BFEEF4", 
                            width:"100%", 
                            height:"64px",
                            justifyContent:"center", 
                            alignItems: "flex-start"}}>
                            <div className="ui card-body" 
                                style={{width:"100%"}}>
                                    <div className="ui grid" id="headerOfCheckOut" style={{marginLeft: "0px", justifyContent: "flex-start"}}>
                                        <div className="one wide column">
                                            <i class="cc paypal icon big"></i>
                                        </div>
                                        <div className="eight wide column">
                                            <p 
                                                style={{
                                                    fontSize:"16px", 
                                                    fontWeight:"bold", 
                                                    display:"flex"}}>
                                                    Buy with PayPal. It is fast and simple.
                                            </p>
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <div 
                        className="ui grid"
                        id="bodyOfCheckOut"
                        style={{
                            justifyContent: "space-evenly",
                            // height:"100%", 
                            // width:"100%",
                            justifyContent: "space-between",
                            alignItems: "stretch",
                            alignContent: "center",
                            flexDirection: "row"}}>
                            <div className="ten wide column">
                                <div style={{height:"fit-content"}}>
                                    <fieldset>
                                        <legend>
                                            <header className="accordion-header" style={{display:"flex"}}>
                                                <h1 style={{fontSize:"24px"}}>Pay With</h1>
                                            </header>
                                        </legend>
                                        <form 
                                            //className="ui form"
                                            style={{
                                                height:"300px",
                                                width:"400px",
                                                display:"flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                justifyContent: "start",
                                                alignItems: "flex-start"
                                                }}>
                                                    <div 
                                                        className="grouped fields" 
                                                        id="groupedFieldsId"
                                                        style={{
                                                            width:"100%",
                                                            display: "flex",
                                                            justifyContent: "flex-start",
                                                            flexDirection: "column"// row for samller 
                                                            }}>
                                                                {Object.keys(mapOfPyamentOptions).map((name,idx)=>(
                                                                    // eslint-disable-next-line react/jsx-key
                                                                    <div 
                                                                        className="field"
                                                                        //id={name+"Id"}
                                                                        style={{
                                                                            display:"flex",
                                                                            width:"100%",
                                                                            margin:"16px"
                                                                        }}>
                                                                            <div
                                                                                style={{
                                                                                    display:"flex",
                                                                                    alignItems: "center"}}>
                                                                                        <div>{/** className="ui radio checkbox" */}
                                                                                            <i className= {mapOfPyamentOptions[name]+" icon big"}></i>
                                                                                            <label style={{fontSize:"16px"}}>
                                                                                                <input 
                                                                                                    type="radio" 
                                                                                                    name={name} 
                                                                                                    id={name+"InputId"} 
                                                                                                    tabIndex={idx} 
                                                                                                    className="hidden"
                                                                                                    value={valueOfClickedRadioButton}
                                                                                                    checked={name===valueOfClickedRadioButton ? true:false}
                                                                                                    defaultChecked={name==="master" ? true:true}
                                                                                                    // onClick={()=>valueOfClickedRadioButton.current=name}
                                                                                                    onChange={()=>setValueOfClickedRadioButton(name)}
                                                                                                    />
                                                                                                {name}
                                                                                            </label>
                                                                                        </div>
                                                                            </div>
                                                                    </div>
                                                                ))}
                                                    </div>
                                        </form>
                                    </fieldset>
                                    <div className="ui divider"></div>
                                    <div>
                                        <div 
                                            className="ui container"
                                            style={{
                                                display:"flex",
                                                width:"100%",
                                                flexDirection: "column",
                                                alignItems: "flex-start"}}>
                                                    <header>
                                                        <h1
                                                            style={{
                                                                fontSize:"24px",
                                                                margin:"32px"}}>
                                                                    Ship to
                                                        </h1>
                                                    </header>
                                                    <p 
                                                        style={{
                                                            fontWeight:"normal",
                                                            width:"200px",
                                                            margin:"0px 16px 16px"}}>
                                                            3988 White plains Road, Apt. 2fr, Bronx, New York, NY, 10466
                                                    </p>
                                                    <p style={{margin:"0px 16px 32px"}}>Change</p>
                                        </div>
                                        <div className="ui divider"></div>
                                        <div
                                            className="ui container">
                                                <header>
                                                    <h1 style={{fontSize:"24px", marginBottom:"16px"}}>
                                                        Review order
                                                    </h1>
                                                </header>
                                                <div 
                                                    className="ui grid">
                                                        <div 
                                                         className="four wide column">
                                                            <div 
                                                                // eslint-disable-next-line react/jsx-no-comment-textnodes
                                                                className="ui small image">
                                                                    <img 
                                                                        src={coverImage.current} 
                                                                        alt="books image"
                                                                        id="object-cover"
                                                                        style={{
                                                                            height:"150px", 
                                                                            width:"100px",
                                                                            borderRadius:"15px",
                                                                            border:"2px solid #8EACCD",
                                                                            padding:"2px",
                                                                        }} />
                                                                </div>
                                                         </div>
                                                         <div 
                                                            className="ten wide column"
                                                            style={{
                                                                display:"flex",
                                                                flexDirection: "column"}}>
                                                                {/* <div 
                                                                    className="ui message">
                                                                        <div 
                                                                            className="header">
                                                                                Last One
                                                                            </div>
                                                                    </div> */}
                                                                
                                                                <p 
                                                                    className=""
                                                                    style={{
                                                                        borderRadius:"24px",
                                                                        fontWeight:"bold",
                                                                        fontSize:"12px",
                                                                        color:"red",
                                                                        border:"2px solid #8EACCD",
                                                                        height:"fit-content",
                                                                        width:"fit-content",
                                                                        padding:"4px 12px 4px 12px"}}>
                                                                        LAST ONE
                                                                </p>
                                                                <section
                                                                    className=""
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        flexDirection: "column",
                                                                        alignContent: "flex-start",
                                                                        alignItems: "baseline"
                                                                    }}>
                                                                    <div style={{display:"flex"}}>   
                                                                        <p style={{fontWeight:"bold",marginRight:"8px"}}>Author:</p>
                                                                        <p>{author.current}</p>
                                                                    </div>
                                                                    <div style={{display:"flex"}}>   
                                                                        <p style={{fontWeight:"bold",marginRight:"8px"}}>Title:</p>
                                                                        <p>{title.current}</p>
                                                                    </div>
                                                                    <div style={{display:"flex"}}>   
                                                                        <p style={{fontWeight:"bold"}}>$</p>
                                                                        <p>{price.current}</p>
                                                                    </div>
                                                                    {/* <div 
                                                                        style={{display:"flex"}}>
                                                                        <i className="check circle outline icon"></i>
                                                                        <p>Bookme Re</p>
                                                                    </div> */}
                                                                    <p style={{color:"gray"}}>Quantity: 1 <br />Free Returns</p>
                                                                    <section>
                                                                        <p>
                                                                            <strong>Delivery</strong>
                                                                            <br />Free 2-4 day delivery
                                                                            <br />Get it by Apr 3 – Apr 5
                                                                            <br />FedEx 2Day
                                                                        </p>
                                                                    </section>
                                                                </section>
                                                            </div>
                                                    </div>
                                        </div>
                                        <div className="ui divider"></div>
                                        <section>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "baseline",
                                                    justifyContent: "flex-start",
                                                    marginBottom: "16px"
                                                }}>
                                                    <h1>Gift cards and coupons</h1>
                                            </div>
                                            <div 
                                                className="ui grid"
                                                id="gridOfInputAndBottom"
                                                style={{
                                                    marginBottom:"24px"
                                                }}>
                                                    <div 
                                                        className="ui cornere labeled massive input `{}`"
                                                        // style={{width:""}}
                                                        >
                                                            <input 
                                                                type="text" 
                                                                name="cardAndCouponsInput" 
                                                                id="cardAndCouponsId"
                                                                // defaultValue="Enter code..."
                                                                placeholder="Enter code..."
                                                                style={{
                                                                    border:""
                                                                }} />
                                                        {/* <div
                                                            className="ui corner label">
                                                                <i className="asterisk icon"></i>
                                                        </div> */}
                                                    </div>
                                                    
                                                    <button
                                                        className="ui circular primary big button"
                                                        style={{
                                                            marginLeft:"32px"
                                                        }}
                                                        onClick={onHandleApplyButton}>
                                                            Apply                     
                                                    </button>
                                            </div>
                                        </section>
                                        <div className="ui divider"></div>
                                        <section>
                                            <div
                                                id="donate"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "baseline",
                                                    justifyContent: "flex-start",
                                                    marginBottom: "16px",
                                                    flexDirection: "column"
                                                }}>  
                                                    <header style={{display: "flex", marginBottom:"24px"}}>
                                                        <h1>Donate to Charity</h1>
                                                        <i class="info circle icon"></i>
                                                    </header>
                                                    {/* <div 
                                                        id="donateParagraphs" 
                                                        style={{
                                                            alignItems: "baseline",
                                                            justifyContent: "flex-start",
                                                            display:"flex",flexDirection:"column"}}> */}
                                                            <h4>Plan International</h4>
                                                            <p style={{color:"gray"}}>
                                                                Your gift to Plan International can provide lifesaving aid and education for children, especially girls. Help them lead, learn, decide and thrive. PayPal Giving Fund (PPGF) receives your donation and grants 100% to a charity no later than 30 days after the end of the month in which the donation is made. Donations are non-refundable and typically tax deductible. PPGF may be unable to grant funds to a charity if the charity has lost tax exempt status, has closed, or no longer accepts funds from PPGF.
                                                            </p>
                                                    {/* </div> */}
                                                    <div
                                                        id="selectAmount"
                                                        style={{display:"flex"}}>
                                                            <h4 
                                                                style={{
                                                                    marginRight:"16px",
                                                                    marginBottom:"0px",
                                                                    justifyContent:"center",
                                                                    marginRight:"16px",
                                                                    display:"flex",
                                                                    alignItems:"center"
                                                                    }}>Select amount</h4>
                                                            <div className="ui teal buttons">
                                                                <div className="ui button">None</div>
                                                                <div className="ui dropdown icon button">
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item"><i className="dollar sign icon"></i> 1.00</div>
                                                                        <div className="item"><i className="dollar sign icon"></i> 2.00</div>
                                                                        <div className="item"><i className="dollar sign icon"></i> 5.00</div>
                                                                        <div className="item"><i className="dollar sign icon"></i>10.00</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="six wide column">
                                <div 
                                    className="ui card"
                                    id="cardOfOrderSummary"
                                    style={{
                                        height:"400px",
                                        width:"600px",
                                        backgroundColor:"#F4F4F4",
                                        borderRadius:"15px",
                                        padding:"20px"}}>
                                            {/* Card of Summary (the erceipt.) */}
                                            <div 
                                                className="ui card-header" 
                                                style={{margin:"20px",
                                                    display: "flex"
                                                }}>
                                                    <h1
                                                        style={{fontSize:"24px"}}>Order Summary</h1>
                                            </div>

                                            <div className="ui card-body">
                                                <table
                                                    style={{margin:"20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        flexWrap: "wrap",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                    }}>
                                                        <tbody className=""
                                                            style={{
                                                                width: "100%"
                                                            }}>
                                                                {Object.keys(mapOfReceipt).map((i)=>(
                                                                    // eslint-disable-next-line react/jsx-key
                                                                    <tr 
                                                                        className="list_of_summary_description"
                                                                        id={i}
                                                                        style={i !== "Order total" ? orderTotalStyleFirstOption.current : orderTotalStyleSecondOption.current}>
                                                                            <td className="">{i}</td>
                                                                            <td className="">{"$"+mapOfReceipt[i]}</td>
                                                                    </tr>
                                                                ))}

                                                        </tbody>
                                                </table>
                                                <div>
                                                    <button
                                                        className="fluid ui circular primary huge button"
                                                        style={{margin:"48px 0px 24px"}}
                                                        onClick={handleConfirmAndPayButton}>
                                                            Confirm and Pay
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="ui card-footer"
                                                style={{width:"100%"}}>
                                                    <div className="ui grid"
                                                        style={{width:"100%"}}>
                                                            <div className="two wide column">
                                                                <i className="handshake outline large blue icon"></i>
                                                            </div>
                                                            <div className="fourteen wide column">
                                                                    <p 
                                                                        style={{fontSize:"12px"}}>
                                                                            Purchase protected by bookme Money Back Guarantee.
                                                                    </p>
                                                            </div>
                                                    </div>
                                            </div>
                                </div>
                            </div>
                    </div>
            </center>
        </div>
    )
}

export default BuyItNow;