import react, { useState } from 'react'
import fail from '../assets/fail.jpg'
import tick from '../assets/tick.jpg'
import loadImg from '../assets/loader.png'
import '../CSS/logger.css'
import { redirect } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { LuMoonStar } from "react-icons/lu";
import { IoSunnySharp } from "react-icons/io5";
import Darkimage from '../assets/darkLoginimg.jpeg'
import lightimage from '../assets/lightloginimg.jpeg'
import App from '../App'
export default function Logger(props) {
    const {register,handleSubmit,formState,getValues, watch,setValue} = useForm({
        defaultValues : {
            logname : '',
            logemail: '',
            logpasscode : '',
            signname :'',
            signemail :'',
            signpsscode :'',
            signupconfirmpassword: ''
        },
        mode : 'all'
    })
    const date = new Date()
    const [ProfileInfo,setProfileInfo] = useState()
    const year = date.getFullYear()
    const {errors,isSubmitSuccessful, isValid,isSubmitting} = formState
    const [theme,settheme] = useState('light')
    const [Loginchoice, setLoginchoice] = useState(false)

    function FuncChoise(props) {
       setLoginchoice((e) => !e)
    }
    function ThemeSetter(props) {
        if(props == 'light'){
            settheme('dark')
        }else if (props == 'dark'){
            settheme('light')
        }
    }
    // function SubmitSingin(data){
    //     console.log(data)
    // }
    // function SubmitSignup(data){
    //     console.log(data)
    // }

    const [progError,seterror] = useState(false)
    const [progSuccess,setSuccess] = useState(false)
    const [progLoad, setload] = useState(false)

    const [progErrormessage,seterrormessage] = useState('Error')
    const [progSuccessmessage,setSuccessmessage] = useState('Successful')
    const [progLoadmessage, setloadmessage] = useState('Loading ...')
    const progressSuccess = {
        display : progSuccess ? 'flex' : 'none'
    }
    const progressError = {
        display : progError ? 'flex' : 'none'
    }
    const progressLoad = {
        display : progLoad ? 'flex' : 'none'
    }
  
    const errorDiv = document.getElementsByName('errorDiv')
    const successDiv = document.getElementsByName('successDiv')
    const loadDiv = document.getElementsByName('loadDiv')

    function Showerror(props){
        if(props == 'show'){
           seterror(true)
        }else if(props == 'hide'){
            seterror(false)
        }
    }
    function ShowSuccess(props){
        if(props == 'show'){
            setSuccess(true)
        }else if(props == 'hide'){
            setSuccess(false)
        }
    }
    function ShowLoad(props){
        const loadDiv = document.getElementsByName('loadDiv')
        if(props == 'show'){
            setload(true)
        }else if(props == 'hide'){
            setload(false)
        }
    }
    function CallVerifier(cred){
        props.verify(cred)
    }


    function SubmitSingin(data) {
        //event.preventDefault()
       
        

        //console.log(signData)
        const FetchFunc = async () => {
            var signData = JSON.stringify({
                'name' : data.logname,
                'email': data.logemail,
                'password': data.logpasscode
            })
            
            console.log('fetching....')
            
            ShowLoad('show')
            function DataFunc (props) {
                var val = JSON.parse(props)
                // console.log(props)
                //console.log(val.profile[0])
                if (val.found == true){
                    var  profVal = {
                        name : val.profile[0].name,
                        email : val.profile[0].email,
                        IsVerified : val.found
                    }
                    
                    setTimeout(() => {
                        ShowLoad('hide')
                        ShowSuccess('show')
                    },2000)
                    
                    setTimeout(() => {
                    ShowSuccess('hide')
                    // window.open('/#/dashboard')
                    // window.close(this)
                    CallVerifier(profVal)
                    },4000) 
                   
                    
                    
                   //setProfileInfo(profVal)
                   
                   
                }
             
                else if(val.found == false) {
                    seterrormessage('User dosen\'t exist!')
                    setTimeout(() => {
                        ShowLoad('hide')
                        Showerror('show')
                    },2000)
                    
                    setTimeout(() => {
                    Showerror('hide')
                    },6000)

                }
            }
            
            fetch('http://127.0.0.1:8000/validate/submit/',
                        {method: 'POST',
                        headers:{
                            'Content-Type':'application/json'
                           },
                        body: signData})
            .then((response) => response.json() )
            .then((data) => DataFunc(data))
                
            
        }

        FetchFunc()


        
        
    
    }
    function SubmitSignup(data) {
        const FetchFunc = async () => {
            var signData = JSON.stringify({
                'name' : data.signname,
                'email': data.signemail,
                'password': data.signpsscode
            })
            function DataFunc (props) {
                var val = JSON.parse(props)
                console.log(val.exists)
                if (val.exists == false){
                    // setSignupResponse(data)
                    
                    
                    setTimeout(() => {
                        ShowLoad('hide')
                        ShowSuccess('show')
                    },2000)
                    
                    setTimeout(() => {
                    ShowSuccess('hide')
                    },4000)

                }else if(val.exists == true) {
                    seterrormessage('User already Exists.')
                    setTimeout(() => {
                        ShowLoad('hide')
                        Showerror('show')
                    },2000)
                    
                    setTimeout(() => {
                    Showerror('hide')
                    },6000)

                }
            }
            
            console.log('sending ....')
            ShowLoad('show')
            fetch('http://127.0.0.1:8000/validate/submit/',
                        {method: 'PUT',
                        headers:{
                            'Content-Type':'application/json'
                           },
                        body: signData})
            .then((response) => response.json() )
            .then((data) => DataFunc(data))
        
    }

        FetchFunc()
       

        // console.log(data)
    }



    return(
    
        <>
        
            <div className={`${theme}`}>
                    
                <div className=' w-full' id='universal-login-container'>
                    <div className=' transition-all duration-500 py-2 w-full dark:bg-slate-900 dark:text-slate-100 text-slate-900 bg-sky-600 flex flex-row justify-around text-center ' id='top-bar-log'>
                        <div className='md:text-xl bg-transparent flex flex-col'>
                            <h1 className=' md:text-2xl font-semibold text-lg '>B-Intel</h1>
                            
                            <small className=' md:text-xl italic'>Embracing the feuture</small>
                        </div>
                        <div className=' md:text-xl flex flex-row align-middle my-auto'>
                            {theme == 'light' ? <IoSunnySharp onClick={() => ThemeSetter('light')} className=' cursor-pointer text-2xl transition-all animate-spin duration-700' /> : <LuMoonStar onClick={() => ThemeSetter('dark')} className=' cursor-pointer shadow-md my-auto shadow-sky-500 border-[0px] border-transparent rounded-full animate-pulse duration-300 transition-all'/>}
                        </div>
                    </div>
                    <div className='bg-slate-300 transition-all duration-1000 dark:bg-slate-800'>
                        
                        
                        
                        <div className=' sm:min-h-[350px] transition-all duration-500 bg-slate-300 dark:bg-slate-800 h-[200px] px-2 flex flex-row w-full'>
                            <img className=' max-w-[700px] mx-auto sm:min-h-[350px] animate-pulse transition-all duration-500 p-2 w-full h-[100%]' src={`${theme == 'light' ? lightimage : Darkimage}`} alt="" />
                        </div>
                        <div style={progressError} className=" z-50 top-0 sticky" name='errorDiv' id="notifier">
                            <img className="w-6 animate-ping p-1.5 sm:w-8 "  src={fail} alt="" />
                        <p className="text-sm font-semibold text-red-500  sm:text-base" id="errorNot">{progErrormessage}</p>   
                        </div>
                        <div style={progressSuccess} className=" z-50 top-0 sticky" name='successDiv' id="notifier" > 
                                <img className="w-6 sm:w-8 "  src={tick} alt="" />
                                <p className="bg-black  text-sm sm:text-base rounded-sm top-1 text-green-500 font-bold p-2 mx-auto w-fit">{progSuccessmessage}</p>
                        </div>
                        <div style={progressLoad} className=" z-50 top-0 sticky" name='loadDiv' id="notifier">
                            <img className="w-6 bg-blue-500 p-1 animate-spin sm:w-8 "  src={loadImg} alt="" />
                            <p className="bg-black animate-pulse text-sm sm:text-base rounded-sm top-1 text-blue-500 font-bold p-2 mx-auto w-fit" >{progLoadmessage}</p>
                        </div>
                        <div>
                            <div className=' '>
                                {!Loginchoice ? <div>
                                    <form className=' dark:text-slate-50' id='loginForm' noValidate onSubmit={handleSubmit(SubmitSingin)}>
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]'  {...register('logname',{
                                            required :'Username is required'
                                        })} placeholder='USERNAME' type="text" />
                                        {errors.logname && <p id='errorform'>{errors.logname?.message}</p>}
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]' {...register('logemail',{
                                            required : 'Email is required',
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Please enter a valid email',
                                            }
                                        })} placeholder='EMAIL' type="email" />
                                        {errors.logemail && <p id='errorform'>{errors.logemail?.message}</p>}
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]' {...register('logpasscode',{
                                            required : 'Password is required'
                                        })} placeholder='PASSWORD' type="password" />
                                        {errors.logpasscode && <p id='errorform'>{errors.logpasscode?.message}</p>}
                                        <button type='submit' className=' hover:bg-transparent hover:border-[1px] dark:hover:text-amber-400 hover:text-slate-900 transition-all duration-500 hover:border-cyan-600 rounded-sm font-semibold text-amber-400 bg-sky-600 min-w-[80px]'>Submit</button>
                                    </form>
                                </div> : <div>
                                <form className=' dark:text-slate-50' id='loginForm' noValidate onSubmit={handleSubmit(SubmitSignup)}>
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]'  {...register('signname',{
                                            required :'Username is required'
                                        })} placeholder='SIGN-UP USERNAME' type="text" />
                                        {errors.signname && <p id='errorform'>{errors.signname?.message}</p>}
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]' {...register('signemail',{
                                            required : 'Email is required',
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Please enter a valid email',
                                            }
                                        })} placeholder='SIGN-UP EMAIL' type="email" />
                                        {errors.signemail && <p id='errorform'>{errors.signemail?.message}</p>}
                                        <input className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]' {...register('signpsscode',{
                                            required : 'Password is required'
                                        })} placeholder='SIGN-UP PASSWORD' type="password" />
                                        {errors.signpsscode && <p id='errorform'>{errors.signpsscode?.message}</p>}
                                        <input placeholder='CONFIRM  PASSWORD'  className=' dark:border-cyan-500 dark:placeholder:text-slate-400 placeholder:text-slate-700 border-slate-950 border-[1px]' {...register('signupconfirmpassword', {
                                                required: true,
                                                validate: (val =   string) => {
                                                    if (watch('signpsscode') != val) {
                                                    return "Your passwords do no match";
                                                    }
                                                },
                                                })} type='password'   />
                                        {errors.signupconfirmpassword && <p id='errorform'>{errors.signupconfirmpassword?.message}</p>}
                                        <button disabled={!isValid} type='submit' className=' disabled:hover:text-slate-800 disabled:bg-slate-400 disabled:text-slate-800 disabled:border-slate-400 hover:bg-transparent hover:border-[1px] dark:hover:text-amber-400 hover:text-slate-900 transition-all duration-500 hover:border-cyan-600 rounded-sm font-semibold text-amber-400 bg-sky-600 min-w-[80px]'>Submit</button>
                                    </form>
                                </div> }
                            </div>
                            <div className='md:text-lg max-w-[500px] mx-auto flex flex-row justify-around py-2 px-8'>
                                <span onClick={FuncChoise} className={` transition-all duration-500 ${!Loginchoice ? 'text-sky-600 font-semibold cursor-pointer' : 'dark:text-slate-100 cursor-not-allowed text-black'} italic`}>Log-in</span>
                                <div className={`  w-[82px] h-[20px] transition-all duration-500 px-1  bg-sky-600 dark:bg-slate-900 flex align-middle  rounded-md my-auto`}><p onClick={FuncChoise} className={` animate-pulse transition-all duration-500${Loginchoice ? ' translate-x-14' : 'translate-x-0'}  my-auto cursor-pointer rounded-full w-2 h-2 transition-all duration-700 bg-red-500 p-2`}></p></div>
                                <span onClick={FuncChoise} className={` transition-all duration-500 ${Loginchoice ? 'text-sky-600 font-semibold cursor-pointer ' : 'dark:text-slate-100 cursor-not-allowed '} italic`}>Sign-Up</span>
                            </div>
                        </div>
                    </div>
                </div>
                <footer  className={ ` px-2 py-3 bg-slate-300 dark:text-slate-50 flex mx-auto text-center transition-all duration-1000 dark:bg-slate-800 `}>
                    <blockquote className=' md:text-lg text-center mx-auto'>All Rights Reserved &#169; {year} | Designed by: <a className=' hover:text-amber-500 underline underline-offset-4' href="https://briannjuguna.netlify.app/">Brian Njuguna</a> </blockquote>
                </footer>
            </div>


        </>
    )
}