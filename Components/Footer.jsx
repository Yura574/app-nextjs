import React from "react";
import {AiFillFacebook, AiFillInstagram} from "react-icons/ai";


const Footer =() => {
    return(
        <div className={'footer-container'}>
            <p> 2022 JSM Headphones All rights reserved</p>
            <p><AiFillInstagram/>
                <AiFillFacebook/></p>
        </div>
    )
}

export default Footer