import React, {memo} from 'react';
import s from "./Repo.module.scss";
import {RepoType} from "../../../types/TypesForProject";

type PropsType = {
    repos: RepoType[]|null
}

export const Repo = memo(({repos}:PropsType) => {
    return (
        <>
            {repos?.map(repo =>
                <div className={s.block} key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                    <p>{repo.description}</p>
                </div>)}
        </>
    )
})