// "use client"

import { useRouter, usePathname } from "next/navigation"
import { Tooltip } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { useEffect, useState, useRef } from "react";

// HeroUI
// import {Tooltip} from "@heroui/tooltip";

import { useBook } from "../../hooks/usebook";
import { BookData } from "../classes/dataclasses/bookData";
import { ClickedBook } from "../clickedbook/page";

/* eslint-disable @next/next/no-img-element */
const Book = ({ book, index }) => {

    /**
     * pre: bookCbooks.json
     * post: Displays the book (single book) in books.
     */

    let stockImage = "https://www.shutterstock.com/shutterstock/photos/2334607157/display_1500/stock-photo-black-for-the-background-the-number-is-made-of-white-painted-wood-2334607157.jpg";
    const img = useRef("");
    const title = useRef("");
    const author = useRef("");

    var bookData = new BookData(
        book["id"],
        book["title"],
        book["author"],
        book["publicationYear"],
        book["genres"],
        book["description"],
        book["coverImage"],
        book["longDescription"],
        book["localCoverImagePath"],
        book["stockCoverImagePath"],
        book["price"],
        book["rates"]
    );

    let href = "/clickedbook/";
    const router = useRouter();

    for (var prop in book) {
        if (prop === ("coverImage")){
            img.current = book[prop];
        } else if (prop === "title") {
            title.current = book[prop];
        } else if (prop === "author") {
            author.current = book[prop];
        } else {
            ;
        }
    }

    const createQueryString=(name,value)=>{
        const params=new URLSearchParams();
        params.set(name,value);
        return params.toString();
    }

    const handleSelectedBook = (e) => {
        e.preventDefault();
        router.push(href+"?"+createQueryString("book",JSON.stringify(bookData)))
    }

    return (
        <center>
            <div className="card" style={{borderRadius:"15px"}}>

                <Tooltip 
                    showArrow={true}
                    key={book["title"]}
                    placement="top"
                    radius={"50px"}
                    color={"primary"}
                    style={{borderRadius:"15px"}}
                    delay={100}
                    closeDelay={100}
                    motionProps={{
                        variants: {
                          exit: {
                            opacity: 0,
                            transition: {
                              duration: 0.1,
                              ease: "easeIn",
                            },
                          },
                          enter: {
                            opacity: 1,
                            transition: {
                              duration: 0.15,
                              ease: "easeOut",
                            },
                          },
                        },
                    }}
                    classNames={{
                        base: [
                            // arrow color
                            "before:bg-neutral-400 dark:before:bg-white",
                        ],
                        content: ["py-2 px-4 shadow-xl", "text-black bg-gradient-to-br from-white to-neutral-400"],
                        }
                    }
                    content={
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">{title.current + " by:"}</div>
                            <div className="text-tiny">{author.current}</div>
                        </div>
                    }
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    >
                        <img 
                            className="ui image" 
                            src={img.current ? img.current : stockImage} 
                            style={{
                                height:"150px", 
                                width:"100px",
                                borderRadius:"15px",
                                border:"2px solid #8EACCD",
                                padding:"2px",
                            }}
                            alt="books image" 
                            onClick={handleSelectedBook}
                        />
                </Tooltip>
            </div>
        </center>
    )
}

export default Book;