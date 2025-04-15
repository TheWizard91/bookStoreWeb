import { useState, useEffect, useCallback } from "react"
import loadingStatus from "../helpers/loadingstatus"

const useGetRequest = (url) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const get = useCallback(async () => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const rsp = await fetch(url);
            const result = await rsp.json();
            // console.log("rsp: "+rsp)
            // console.log("result: "+result)
            setLoadingState(loadingStatus.loaded);
            return result;
        } catch (error) {
            setLoadingState(loadingStatus.hasErrorred);
            console.log("Error in useGetS...: "+error);
        }
    }, [url]);
    return {get, loadingState};
}

export default useGetRequest;