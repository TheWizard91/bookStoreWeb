/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "../../css/globals.css";

import { Image } from "next/image" 
import { Button } from "@nextui-org/react";

import { useRef, useEffect, useState } from "react";
import Books from "./books";
import LoadingIndicator from "../../helpers/loadingindicator";
import useBooks from "../../hooks/usebooks";
import { LeftIcon } from "./icons/lefticon"
import { HeartIcon } from "./icons/hearticon"
import { RightIcon } from "./icons/righticon"

const BestSellers = () => {
    
    /**
     * pre:---.
     * post: Display best seller books.
     */

    const bottonColorWhenPressed = useRef();
    const bottonBackGroundColorWhenPressed = useRef()

    // Receiving the books and loading state.
    const {books, setBooks, loadingState} = useBooks({booksPath:"../../../fulllibraryofbooks.json"});// the path is right under the public folder (above src)
    console.log("books: "+JSON.stringify(books))
    const [state, setstate] = useState();
    const [lastBookVisible, setLastBookVisible] = useState(4);//currentIndex * booksPerPage
    const [firstBookVisible, setFirstBookVisible] = useState(0);//lastBookVisible - booksPerPage
    const [length, setLength] = useState(4);

    if (loadingState !== "loading") {
      return <LoadingIndicator loadingState={loadingState} />
    }
    
    const handleLeftArrowButton = () => {
        // Handler of left arrow
        if (0 < firstBookVisible) {
            setFirstBookVisible(firstBookVisible - 4);
            setLastBookVisible(lastBookVisible - 4);
        }
    }
  
    const handleRightArrowButton = () => {
        // Handler of right arrow
        if (lastBookVisible < 50) {
            setFirstBookVisible(firstBookVisible + 4);
            setLastBookVisible(lastBookVisible + 4);
        }        
    }

    return (
        <>
            <div id="bestSellerLowerSegment" className="">
                <span id="time-HASH" class="smalltext"><h1>Best Sellers</h1></span>
                <span class="ios-circle">
                    <div>
                        <button className="btn btn-outline-primary" type="button">See More</button>
                    </div>
                </span>
            </div>

            <div id="booksSegmentForBestSellerBooks" >
                
                {/* Left button */}
                <Button 
                    id="leftButton"
                    isIconOnly 
                    color="danger"
                    aria-label="left"
                    style={{borderRadius: "50%"}}
                    onClick={handleLeftArrowButton}
                    >
                        <LeftIcon />
                </Button>

                {/* List of Books */}
                <Books 
                    books={books}
                    length={4} //lastBookVisible - firstBookVisible
                    firstBookVisible={firstBookVisible} 
                    lastBookVisible={lastBookVisible} 
                    whichComponent={"bestSeller"} />
                
                {/* Right button */}
                <Button 
                    id="rightButton"
                    isIconOnly 
                    color="danger"
                    aria-label="left"
                    style={{borderRadius: "50%"}}
                    onClick={handleRightArrowButton}
                    >
                        <RightIcon />
                 </Button>
            </div>
        </> 
    )
}

export default BestSellers;