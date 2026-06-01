import { useEffect } from "react";
import type { BannerData } from "../../types"
import "./Banner.css"
import Cross from "../misc/Cross";

export default function Banner({message, closeBanner, success}: BannerData){

    useEffect(() => {
        const timer = setTimeout(closeBanner, 5000);
        return () => clearTimeout(timer);
    }, [closeBanner]);

    return(
        <div className={`BannerSuccess-${success}`}>
            <div>
                <h2>{message}</h2>
                <button onClick={closeBanner}><Cross/></button>
            </div>
        </div>
    )
}