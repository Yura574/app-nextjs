import s from './Modal.module.css'
import React from "react";

type modalType = {
    activeModal: boolean
    cancel: ()=> void
    children: React.ReactNode
}

export const    Modal = (props: modalType) => {

    return (
        <div className={props.activeModal? `${s.model_wrapper} ${s.active}`:`${s.model_wrapper}`} onClick={props.cancel}>
            <div className={props.activeModal? `${s.model_content} ${s.active}`:`${s.model_content}`} onClick={(e) => e.stopPropagation()}>
                    {props.children}
            </div>
        </div>
    )
}