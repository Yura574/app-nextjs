import '../styles/globals.css'
import React from "react";
import {App, Layout} from "../Components";
import {StateContext} from "../context/StateContext";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {store} from "../store/store";

function MyApp({Component, pageProps}) {

    return (
      <Provider store={store}>
            <Layout>
                <Toaster/>
                <Component {...pageProps} />
            </Layout>
      </Provider>

    )
}

export default MyApp
