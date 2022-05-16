import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.scss';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Profile} from "./components/profile/Profile";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {Alternative} from "./components/alternative/Alternative";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {RepoType, UserType} from "./types/TypesForProject";
import LinearProgress from "@mui/material/LinearProgress";
import {Pagination} from "@mui/material";

const App = () => {

    const [user, setUser] = useState<UserType|null>(null)
    const [username, setUsername] = useState<string>("")
    const [repos, setRepos] = useState<RepoType[]|null>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(0)

    const addUser = async (username:string) => {
        setLoading(true)
        try {
            const person = await axios.get<UserType>(`https://api.github.com/users/${username}`)
            setUser(person.data)
            setUsername(person.data.login)
            setPages(Math.ceil(person.data.public_repos / 4))
        } catch (e) {
            setError(true)
        }
        setLoading(false)
    }

    const addRepos = async (page:number) => {
        setLoading(true)
        try {
            const repositories = await axios.get<RepoType[]>(`https://api.github.com/users/${username}/repos?&per_page=4&page=${page}`)
            setRepos(repositories.data)
        } catch (e) {
            setError(true)
        }
        setLoading(false)
    }

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && username.trim() !== "") {
            addUser(username)
            addRepos(page)
        }}

    const handler = (e:ChangeEvent<unknown>, num:number) => {
        setPage(num)
        addRepos(num)
    }

    const lastRepoIndex: number = page * 4
    const firstRepoIndex: number = lastRepoIndex - 4

    return (
        <div className={'App'}>
            <div className={'main'}>
                <div className={'container'}>
                    <div className={'wrapper'}>
                        <FontAwesomeIcon className={'git'} icon={faGithub}/>
                        <div className={'icon'}>
                            <FontAwesomeIcon className={'search'} icon={faMagnifyingGlass}/>
                        </div>
                        <input type="text"
                               value={username}
                               onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                               onKeyDown={onKeyHandler}
                               placeholder={"Enter GitHub username"}/>
                    </div>
                </div>
            </div>
            {loading && <LinearProgress color={'secondary'}/>}
            {!error
                ? (user?.name)
                    ? <div>
                        <Profile repos={repos} user={user}/>
                        <div className={"pagination"}>
                            <p>{firstRepoIndex + 1}-{lastRepoIndex} of {user?.public_repos} items</p>
                            <Pagination count={pages}
                                        page={page}
                                        shape="rounded"
                                        color="primary"
                                        onChange={handler}/>
                        </div>
                    </div>
                    : <Alternative icon={faMagnifyingGlass} text={'Start with searching a GithHub User'}/>
                : <Alternative icon={faUser} text={'User not found'}/>
            }
        </div>
    )
}

export default App;




