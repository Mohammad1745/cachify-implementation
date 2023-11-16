'use client'

import {useSelector} from "react-redux";
import randomJokesService from "@/system/services/randomJokes/randomJokesService";
import {useEffect} from "react";

export default function Home() {
    const randomJokesData = useSelector((state) => state.randomJokes.randomJokesData);
    useEffect(() => {
        randomJokesService.getList();
    },[])

    return ! randomJokesData ?
        (
            <div className={`flex justify-center items-center h-[100vh]`}> Loading... </div>
        )
        :(
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 max-w-5xl w-full flex flex-col gap-2 font-mono text-sm">
                    {randomJokesData.data.map(joke => (
                        <div key={joke.id} className={`border rounded p-2`}>
                            <div>Setup: {joke.setup}</div>
                            <div>Punch Line: {joke.punchline}</div>
                        </div>
                    ))}
                </div>
            </main>
    )
}
