import React, { useState } from "react";
import '../App.css'
import '../CSS/logger.css'

import ProfileIcon from '../assets/user.png'
export default function Dashboard(props) {
    console.log(props.profile)
    const profileInfo = props.profile
    const [profDisp, setProfDisp] = useState(true)

    function MinimiseProf(){
        setProfDisp((d) => !d)

    }
    const date = new Date()
    const year = date.getFullYear()

    return (
        <>
        <div className=" bg-slate-100 h-full min-h-[100%] w-full">
            <div className="w-full flex flex-row justify-around">   
                    <div id="title" className=' ml-4 bg-transparent flex flex-col'>
                            <h1 className='  font-semibold text-2xl '>B-Intel</h1>
                            
                            <small className=' italic'>Embracing the feuture</small>
                    </div>
                    <div className={` sm:text-xl ${profDisp ? 'w-10 sm:w-15 sm:h-15 h-10 bg-slate-900 ' : 'h-fit w-[150px] min-w-fit'}  duration-700 border-[1px] border-slate-900 rounded-sm p-2 transition-all  flex flex-col align-middle text-left ml-auto   `} id="header-nav">
                <img onClick={MinimiseProf} className={` ${profDisp ? ' animate-pulse' : ''} w-8 h-8 mx-auto`} src={ProfileIcon} alt="" />
                <div className={` min-w-[200px] ${profDisp ? ' z-0 h-0 w-0 opacity-0' : 'z-50 w-fit h-fit opacity-95'} transition-all duration-700  rounded-sm p-2 flex flex-col align-middle text-left ml-auto min-w-fit w-[150px] `}>
                    <span className="sm:text-2xl gap-1 align-middle text-center flex flex-row"><p className="sm:text-lg  text-amber-600 font-semibold">Name : </p>{profileInfo.name}</span>
                    <span className="sm:text-2xl gap-1 align-middle text-center flex flex-row"> <p className="sm:text-lg  text-amber-600 font-semibold">Email : </p> <small>{profileInfo.email}</small></span>
                    <span className="sm:text-2xl gap-1 align-middle text-center flex flex-row"> <p className=" sm:text-lg text-amber-600 font-semibold">Status :</p> </span>
                    <button className=" sm:min-w-[120px] hover:text-amber-600 hover:font-semibold hover:bg-transparent transition-all duration-500 hover:border-slate-900 hover:border-[1px] bg-slate-900 text-slate-50 mx-auto my-1 min-w-[80px] w-fit p-1 rounded-sm">Log-Out</button>
                    <small onClick={MinimiseProf} className=" sm:text-lg w-fit italic font-semibold text-sm transition-all duration-500 hover:text-amber-600">minimise</small>
            
                </div>
                    </div>
            </div>
            
            <hr />
            <div className="  flex" id="hero-section">
                <blockquote className=" text-slate-50 mx-auto flex flex-col">
                    <h1>Hi I am,</h1>
                    <big>{profileInfo.name}</big>
                    <small>You either go big or go bigger..</small>
                </blockquote>

            </div>

            <div className=" md:text-2xl w-full h-fit flex">
                <div className=" shadow-md shadow-slate-900 flex flex-col mx-auto py-2 mt-20 border-[1px] border-slate-900 rounded-md p-6 min-h-[250px] justify-center gap-3" id="card">
                    <h1 className=" md:text-2xl text-xl font-bold underline underline-offset-4 mx-auto">History Review</h1>
                    <span className=" gap-1 align-middle text-center flex flex-row"> <p className=" text-sky-600 font-semibold">Creator : </p> <a className=' hover:text-amber-500 underline underline-offset-4' href="https://briannjuguna.netlify.app/">Brian Njuguna</a></span>
                    <span className=" gap-1 align-middle text-center flex flex-row"> <p className=" text-sky-600 font-semibold">Name : </p> <p>{profileInfo.name}</p></span>
                    <span className=" gap-1 align-middle text-center flex flex-row"> <p className=" text-sky-600 font-semibold">Email : </p> <p>{profileInfo.email}</p></span>



                </div>
            </div>

            <footer  className={ ` w-[90%]  py-3 sticky bottom-0 sm:px-4 px-2 mb-0 dark:text-slate-50 flex mx-auto text-center transition-all duration-1000 dark:bg-slate-800 `}>
                    <blockquote className=" text-center mx-auto md:text-xl">All Rights Reserved &#169; {year} | Designed by: <a className=' hover:text-amber-500 underline underline-offset-4' href="https://briannjuguna.netlify.app/">Brian Njuguna</a> </blockquote>
            </footer>

        </div>

        </>
    )
}