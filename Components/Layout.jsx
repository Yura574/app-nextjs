import React from "react";
import Head from "next/head";
import {Footer, Navbar} from "./index";


const Layout =({children}) => {
    return(
        <div>
            <Head>
                <title>Coplasca store</title>
            </Head>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Layout