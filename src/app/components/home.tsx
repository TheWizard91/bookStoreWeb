import Device from "../../helpers/index.ts"
import Login from "../login/page";

import {AuthProvider} from "../context/authcontext.js"

const Home = () => {
  return (
    <main>
      <Device>
        {({ isMobile }) => {
            if (isMobile) {
                return (
                    <>
                      <Login />
                    </>
                )
            }
            return (
                <>
                  <Login />
                </>
            )
        }}
      </Device>
    </main>
  );
}

export default Home;