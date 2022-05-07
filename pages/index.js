import { FooterBanner, HeroBanner} from "../Components";
import React from "react";
import {client} from "../lib/client";


const Home =({products, bannerData}) => {
    console.log(bannerData[0])

    return (
        <div>

            <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
            <div className={'products-heading'}>
                <h2>Best Selling Products</h2>
            </div>
            <div className={'products-container'}>
                {products?.map(el => el.name)}
            </div>

            <FooterBanner/>
        </div>


    )
}

export const getServerSideProps = async ()=> {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    const bannerQuery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerQuery)
    return{
        props: {products, bannerData}
    }
}


export default Home
