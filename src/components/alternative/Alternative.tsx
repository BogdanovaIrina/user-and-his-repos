import React, {memo} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from "./Alternative.module.scss"

type PropsType = {
    icon: any
    text: string
}

export const Alternative = memo(({icon, text}:PropsType) => {
    return (
        <div className={s.main}>
            <div className={s.part}>
                <FontAwesomeIcon className={s.icon} icon={icon}/>
            </div>
            <div className={s.part}>
                <p>{text}</p>
            </div>
        </div>
    )
})