const GetBooksAsMaps = () => {

    function createTheMapOfBooks ({book: string}) {
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
    }
}

export default GetBooksAsMaps;