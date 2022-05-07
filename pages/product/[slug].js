import React, {useEffect, useState} from "react";
import {client} from "../../lib/client";
import {urlFor} from "../../lib/client";
import {AiFillAlert, AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";
import {Product} from "../../Components";
import {useStateContext} from "../../context/StateContext";


const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product

    const {incQty, decQty, qty, changeTotalPrice, totalPrice} = useStateContext()

    const [index, setIndex] = useState(0)

    useEffect(() => {
        changeTotalPrice(price)
    }, [qty])




    return (
        <div>
            <div className={'product-detail-container'}>
                <div>
                    <div className={'small-images-container'}>
                        <img src={urlFor(image && image[index])} style={{width: "500px"}} alt=""/>
                    </div>
                    <div className={'small-images-container'}>
                        {image?.map((item, i) => (
                            <img src={urlFor(item)}
                                 className={i === index
                                     ? 'small-image selected-image'
                                     : 'small-image'}
                                 onMouseEnter={() => setIndex(i)}
                                 alt=""/>
                        ))}
                    </div>
                </div>
                <div className={'product-detail-desc'}>
                    <h1>{name}</h1>
                    <div className={'reviews'}>
                        <div>
                            <AiFillStar color={'red'}/>
                            <AiFillStar color={'red'}/>
                            <AiFillStar color={'red'}/>
                            <AiFillStar color={'red'}/>
                            <AiOutlineStar color={'red'}/>
                        </div>
                        <span>(20)</span>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className={'price'}>{totalPrice === 0 ? price : totalPrice}p</p>
                    <div className={'quantity-desc'}>
                        <span className={'minus'} onClick={decQty}>
                           <AiOutlineMinus color={'gray'}/>
                        </span>
                        <span className={'minus'} >
                           {qty}
                        </span>
                        <span className={'plus'} onClick={incQty}>
                           <AiOutlinePlus color={'gray'}/>
                        </span>
                    </div>
                    <div className={'buttons'}>
                        <div>
                            <button className={'add-to-cart'}>
                                Add to cart
                            </button>
                        </div>
                        <div>
                            <button className={'buy-now'}>
                                Buy now
                            </button>
                        </div>
                    </div>


                </div>

                <div className={'marquee'}>
                    <h2>May also like</h2>
                    <div className={'maylike-products-container track'}>

                        {products.map(item => (
                            <Product
                                key={item._id}
                                product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
    slug {
       current
      }
    }`;
    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)


    return {
        props: {product, products}
    }
}


export default ProductDetails