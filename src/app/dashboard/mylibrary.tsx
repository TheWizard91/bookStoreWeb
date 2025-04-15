/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "../../css/globals.css";
// import "../../css/buttons.css";

import { Image } from "next/image" 
import {Button} from "@nextui-org/react";

import { useRef, useEffect, useState } from "react";
import Books from "./books";
import LoadingIndicator from "../../helpers/loadingindicator";
import useBooks from "../../hooks/usebooks";
import { LeftIcon } from "./icons/lefticon"
import { HeartIcon } from "./icons/hearticon"
import { RightIcon } from "./icons/righticon"

const MyLibrary = () => {
  /**
   * pre:---.
   * post: Display the number of books in your library.
   */

  const {books, setBooks, loadingState} = useBooks({booksPath:"../../../fulllibraryofbooks.json"});
  const [currentIndex, setCurrentIndex] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(4);
  const [state, setstate] = useState();
  const [lastBookVisible, setLastBookVisible] = useState(currentIndex * booksPerPage);
  const [firstBookVisible, setFirstBookVisible] = useState(lastBookVisible - booksPerPage);
  const bottonColorWhenPressed = useRef();
  const bottonBackGroundColorWhenPressed = useRef()

  useEffect(() => { 
      setFirstBookVisible(firstBookVisible)  
      return () => {
          
      };
  }, []);

  if (loadingState !== "loading") {
    return <LoadingIndicator loadingState={loadingState} />
  }

  const leftArrowButtonHandler = () => {
      if (0 < firstBookVisible) {
          setFirstBookVisible(firstBookVisible-4)
          setLastBookVisible(lastBookVisible-4)
      }
  }

  const rightArrowButtonHandler = () => {        
    if (firstBookVisible < 50) {
      setFirstBookVisible(firstBookVisible+4)
      setLastBookVisible(lastBookVisible+4)
    }        
  }

  return (
    <>
      <div id="myLibraryUpperSegment">
          <span id="time-HASH" className="smalltext"><h1>My Library</h1></span>
          <span className="ios-circle">
            <div>
            <div>
              <button className="btn btn-outline-primary" type="button">View All</button>
            </div>
            </div>
          </span>
      </div>

      <div id="booksSegmentForMyLibrary" >
          
          <Button 
              id="leftButton"
              isIconOnly 
              color="danger"
              aria-label="left"
              style={{borderRadius: "50%"}}
              onClick={leftArrowButtonHandler}
              >
                <LeftIcon />
          </Button>

          <Books books={books} length={4} firstBookVisible={0} lastBookVisible={0} whichComponent={"myLibrary"}/>
          
          <Button 
            id="rightButton"
            isIconOnly 
            color="danger"
            aria-label="left"
            style={{borderRadius: "50%"}}
            onClick={rightArrowButtonHandler}
            >
              <RightIcon />
          </Button>

      </div>
    </>
  )
}

export default MyLibrary;