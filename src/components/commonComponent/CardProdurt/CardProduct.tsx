import cardClass from './cardProduct.module.css'

type CardType = {
    id: string
    title: string
    image: string
}
export const CardProduct = (props: CardType) => {
    const {image, title} = props
    return (
        <div className={cardClass.card}>
            <div>{title}</div>
            <img src={image} className={cardClass.img} alt={'card'}/>

            <div>30p</div>
        </div>
    )
}