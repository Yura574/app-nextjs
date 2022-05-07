import { FooterBanner, HeroBanner} from "../Components";
import React from "react";


export default function Home() {
    return (
        <div>

            <HeroBanner/>
            <div className={'products-heading'}>
                <h2>Best Selling Products</h2>
            </div>
            <div className={'products-container'}>
                {['Product1 ', ' Product2'].map(el => el)}
            </div>
as

            <FooterBanner/>
        </div>


    )
}
