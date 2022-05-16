import React, {memo} from 'react';
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from "./User.module.scss"
import {UserType} from "../../types/TypesForProject";

type PropsType = {
    user:UserType|null
}

export const UserInfo = memo(({user}:PropsType) => {
    return (
        <div className={s.main}>
            <div>
                {user?.avatar_url
                    ? <img className={s.round} src={user.avatar_url} alt={user.avatar_url}/>
                    : ""}
            </div>
            <h3>{user?.name}</h3>
            <p><a href={user?.html_url} target="_blank">{user?.login}</a></p>
            <div className={s.icon}>
                <div><FontAwesomeIcon className={s.i} icon={faUserGroup}/> {user?.followers} <span>followers</span></div>
                <div><FontAwesomeIcon className={s.i} icon={faUser}/><span> {user?.following} following</span></div>
            </div>
        </div>
    )
})