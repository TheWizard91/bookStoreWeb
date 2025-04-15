'use client'

import MyLibrary from "./mylibrary"
import BestSellers from "./bestsellers"
import Footer from "./footer"
// import LoadingIndicator from "../../helpers/loadingindicator";

const MainBody = () => {
    return (
        <div id="mainBody">
            <MyLibrary />
            <BestSellers />
            {/* <Footer /> */}
        </div>
    )
}

export default MainBody;