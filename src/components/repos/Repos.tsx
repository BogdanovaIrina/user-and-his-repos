import React, {memo} from 'react';
import {faRectangleXmark} from "@fortawesome/free-solid-svg-icons";
import s from "./Repos.module.scss"
import {RepoType, UserType} from "../../types/TypesForProject";
import {Repo} from "./repo/Repo";
import {Alternative} from "../alternative/Alternative";

type PropsType = {
    repos: RepoType[]|null
    user:UserType|null
}

export const Repos = memo(({repos, user}:PropsType) => {

    return (
        <>{repos
            ?<div className={s.container}>
                <h1>Repositories ({user?.public_repos})</h1>
                <Repo repos={repos}/>
            </div>
            : <div className={s.zero}><Alternative icon={faRectangleXmark} text={'Repository list is empty'}/></div>
        }
        </>
    )
})