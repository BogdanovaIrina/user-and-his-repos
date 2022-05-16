import React, {memo} from 'react';
import {Repos} from "../repos/Repos";
import {UserInfo} from "../user/UserInfo";
import s from "./Profile.module.scss";
import {RepoType, UserType} from "../../types/TypesForProject";

type PropsType = {
    user:UserType|null
    repos:RepoType[]|null
}

export const Profile = memo(({user, repos}:PropsType) => {

    return (
          <div className={s.main}>
                <div className={s.container}>
                      <div className={s.profile}>
                          <div className={s.user}><UserInfo user={user}/></div>
                          <div className={s.repo}><Repos user={user} repos={repos} /></div>
                      </div>
                  </div>
              </div>
    )
})