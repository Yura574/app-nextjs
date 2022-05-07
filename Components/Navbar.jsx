import React from "react";

import {AiOutlineShopping} from "react-icons/ai";
import Link from "next/link";

const Navbar =() => {
    return(
        <div>
            <div className={'navbar-container'}>
                <p className={'logo'}>
                    <Link href={`/`}>
                        Coplasca store
                    </Link>
                </p>
                <button className={'cart-icon'}>
                    <AiOutlineShopping/>
                    <span className={'cart-item-qty'}>1</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar