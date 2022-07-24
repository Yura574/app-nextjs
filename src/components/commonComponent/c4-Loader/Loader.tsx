import React from 'react';
import s from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.loader}>
                <div className={s.line}/>
            </div>
        </div>
    );
};