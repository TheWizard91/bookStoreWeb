import "semantic-ui-react";
// import "semantic-ui-css";

// import 'bootstrap/dist/css/bootstrap.css';
import "../../css/globals.css";
import { Link } from "next/link";
import { useEffect, useRef, useState } from "react"
import { Segment, Grid, Menu, Image, Button, Icon, Card } from "semantic-ui-react"

const NavBarSemanticUI = ({height, width }) => {

    /** */
    
    const [widthOfMenu, setWidthOfMenu] = useState("three wide column right floated");
    
    useEffect(() => {
        if (width > 1000) { // large screen.
            setWidthOfMenu("three wide column right floated");
        } else { // smaller screen h>w. 
            setWidthOfMenu("six wide column right floated");
        }
        
        return () => {
            console.log("failed getting window size.")
        };
    }, []);

    const innerMenuHandler = (e, { name }) => {
        e.preventDefault();
        cosole.log("visibility: "+name);
    }
    
    return (
        <div className="ui clearing segment">
            <div className="six column grid">
            <div className="three wide column">
                <div className="column" style={{display: "contents"}}>
                    <h1>Book</h1>
                </div>
            </div>
            <div className={widthOfMenu}>
                {/* Bookmark */}
                <button className="ui circular basic blue icon button">
                    <i className="big bookmark bell icon"></i>
                </button>
                {/* Cart */}
                <button className="ui circular basic blue icon button">
                    <i className="big shop icon"></i>
                </button>
                {/* User */}
                <button name="userButton" className="ui circular basic blue icon button">
                    <i className="big user circle icon"></i>
                </button>
                {/* Side Menu. */}
                <button className="ui circular basic blue icon button">
                    <i className="big settings vertical icon"></i>
                </button>
            </div>
        </div>
    </div>
    )
}


{/* <Segment>
<Grid
    column={6}>
        <Grid.Row>
            <Grid.Column width={1}>
                <h1>Book</h1>
            </Grid.Column>
            <Grid.Column width={5}>
                <Menu
                    icon="labeled"
                    item={4}
                    fliud
                    secondary
                    left
                    horizontal>
                        <Button
                            className="ui circular icon blue button"
                            primary
                            color={"blue"}
                            name="shop"
                            onClick={innerMenuHandler}
                            >
                                <Icon name={"large shop"} />
                        </Button>
                        <Button>

                        </Button>
                        <Button>

                        </Button>
                        <Button>

                        </Button>
                </Menu>
            </Grid.Column>
        </Grid.Row>
</Grid>
</Segment> */}

export default NavBarSemanticUI;