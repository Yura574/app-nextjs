import React from "react";
import Link from "next/link";


const HeroBanner =() => {
    return(
        <div className={'hero-banner-container'}>
            <div>
                <p className={'beats-solo'}> small  text</p>
                <h3>mid text</h3>
                <img src="" alt="head" className={'hero-banner-image'}/>
            </div>

            <Link href={'/product/id'}>
                <button> button text</button>
            </Link>


        </div>
    )
}

export default HeroBanner