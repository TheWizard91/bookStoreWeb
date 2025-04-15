import { useState, useEffect, useCallback } from "react"
import useGetRequest from "./usegetrequest"

const useBooks = ({booksPath}) => {
    const [books, setBooks] = useState([]);
    const {get, loadingState} = useGetRequest(booksPath);

    useEffect(() => {
        // subscribe
        const fetchHouses = async () => {
            const books = await get();
            setBooks(books);
            console.log("EachBooks: "+books)
        }
        fetchHouses()
    }, [get]);

    return {books, setBooks, loadingState};
}

export default useBooks;