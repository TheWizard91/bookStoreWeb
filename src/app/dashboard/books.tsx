/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, useRef } from "react"
import Book from "./book"

const Books = ({
    books, 
    length, 
    firstBookVisible, 
    lastBookVisible, 
    whichComponent,
}) => {
    
    /**
     * pre: boksCbooks.json
     * post: Passing down the books to Book component.
     */

    const [booksArrayState, setBooksArrayState] = useState([]);
    const [indeces, setIndeces] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const booksArray = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const populateArrayOfBooks = () => {
        for (let x = firstBookVisible; x <= (firstBookVisible + length); x++) {
            if (whichComponent === "myLibrary"){
                booksArray.push(books[x]); // booksArray.push(boo,keks[getRandomInt(40)]);
            } else {
                booksArray.push(books[x]);
            }
        }
        setBooksArrayState(booksArray);
    }

    useEffect(() => {
        return () => {
            populateArrayOfBooks()
        };
    }, [firstBookVisible]);
    
    return (
        <div className="segment" style={{display:"contents"}}> 
            {booksArrayState && booksArrayState.map((book,index) => (
                <div className="list">
                    <div className="ui cards" id="myLibrarySegment">
                        <Book book={book} index={firstBookVisible+index} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Books;