
import {    SearchIcon,
             
            ChatIcon, 
            BellIcon,
            ShoppingCartIcon,
            HashtagIcon,
            UserAddIcon} from '@heroicons/react/outline'


import HeaderRightIcon from './HeaderRightIcon.jsx'
import { useState } from 'react';
import ProfileModal from '../Modals/ProfileModal.jsx';
import OutsideClickHandler from 'react-outside-click-handler';
import SubscribersModal from '../Modals/SubscribersModal.jsx';
import NotificationsModal from '../Modals/NotificationsModal.jsx';
import CartModal from '../Modals/CartModal.jsx';
import LeftbarMob from '../Sidebars/LeftbarMob.jsx';
import RightbarMob from '../Sidebars/RightbarMob.jsx';
import {Link} from 'react-router-dom';

import { useDispatch } from "react-redux";
import { useEffect } from 'react';


import{SignupForm, LoginForm, VerifyForm} from '../Modals/RegForms.jsx'
import {dailyPointsAction} from '../Midwares/rdx/actions/profileAction.js'

function Header() {

    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    const[popProfile, setpopProfile] = useState(false);
    const[popSubscribers, setpopSubscribers] = useState(false);
    const[popNotifications, setpopNotifications] = useState(false);
    const[popCart, setpopCart] = useState(false);
    const[popRankings, setpopRankings] = useState(false);
    const[popContacts, setpopContacts] = useState(false);
    const[popDailyPoints, setpopDailyPoints] = useState(false);

    const[popLogin, setpopLogin] = useState(false);
    const[popSignup, setpopSignup] = useState(true);

    const dispatch= useDispatch();
    

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };

            useEffect(() => {
                if(user){
                    if (parseInt(Date.now()) > (user.result.dailyLogin + 86400000)){
                        setpopDailyPoints(true)
                        console.log("Daily Log in")
                    }
                }
            }, [setpopDailyPoints]);
      
            if (user) {
                const decodedJwt = parseJwt(user.token);
                console.log(decodedJwt);
                console.log('time now: ' + Date.now());
                console.log('daily Login: ' + user.result.dailyLogin);
                console.log('award after: '+ (user.result.dailyLogin + 86400000));
                if (decodedJwt.exp * 1000 < Date.now()) {
                
                        dispatch({type:"LOGOUT"});
                        window.location.reload(true);
                    
                }
              
            }
           const handlePointer = ()=>{
                dispatch(dailyPointsAction(user.result._id, setpopDailyPoints));
                console.log('awarded');
           }
       
   
    

    return (
        
        <div className= "sticky top-0 z-50">
              {/*==============SIGN UP/ LOGIN =================*/}
            {user && !user.result.verified  ? <VerifyForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>} 
            { popSignup && !user ? <SignupForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
            {popLogin && !user ? <LoginForm  popLogin = {popLogin} popSignup ={popSignup}  setpopLogin ={setpopLogin} setpopSignup = {setpopSignup} />: <></>}
       
        <div className= "sticky top-0 z-50 bg-gray-200 border-b-2 border-gray-300 p-2 lg:px-6 lg:py-3 shadow-md ">
        <div className= "flex items-center  p-0  space-x-2 justify-between">
            {/*Left*/}
            <Link to='/'>
                <div className="cursor-pointer  rounded-full hover:bg-gray-100 bg-transparent flex items-center justify-between">
                            
                            <div className= 'rounded-full items-center text-gray-200 bg-gray-100 object-cover'>
                                <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                            </div>

                            {user ?
                            <>
                                <h1 className= "m-1 inline-flex text-base font-light text-gray-400">Home</h1>
                               
                            </>
                        :
                           <> 
                                <h1 className= "m-1 inline-flex text-base font-bold text-gray-700">Log In / Sign Up</h1> 
                                
                            </>
                            }
                </div>
           </Link>
            
            {/* Mid */}
            
                <div className="hidden sm:flex items-center rounded-full w-1/3 mx-1 bg-gray-100 sm:pr-4">
                    <div className="p-2 sm:p-3 bg-gray-400 hover:bg-cyan-400 rounded-full items:center"> <SearchIcon className= 'h-6 text-white'/></div>
                    <input className ="hidden sm:w-full bg-transparent sm:pr-1 h-10 md:inline-flex ml-1 bg-transparent items-center outline-none font-light placeholder-gray-400"
                     type="text"
                    placeholder="Search Zoorura"/>
                
                </div>
            

            {/*Header Right*/}
            { user &&
                <div className="flex items-center  bg-transparent sm:space-x-2 justify-end">
                    
                       
                        {/* Subscribers Modal & Button */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopSubscribers(false);
                            }}
                            >
                            <div 
                            onClick={ () => 
                            {setpopSubscribers(!popSubscribers)}
                            }>
                            <HeaderRightIcon Icon = {UserAddIcon} badge="1"/>
                            </div>
                            {popSubscribers && <SubscribersModal setshowSubscribers={setpopSubscribers}/>}
                            
                        </OutsideClickHandler>

                        {/* Notifications Modal */}

                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopNotifications(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopNotifications(!popNotifications)}
                            }>
                            <HeaderRightIcon Icon = {BellIcon} badge="1"/>
                            </div>
                            {popNotifications && <NotificationsModal setshowNotifications={setpopNotifications}/>}
                            
                        </OutsideClickHandler>

                            {/* Chat Modal */}
                            <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopContacts(!popContacts)}
                            }>
                                <HeaderRightIcon Icon = {ChatIcon} badge="3"/> 
                                </div>
                            {popContacts && <RightbarMob setshowContacts={setpopContacts}/>}
                            
                        </OutsideClickHandler>     

                        {/* Cart Modal */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopCart(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopCart(!popCart)}
                            }>
                                <HeaderRightIcon Icon = {ShoppingCartIcon} badge="2"/>
                        </div>
                        {popCart && <CartModal setshowCart={setpopCart}/>}
                            
                        </OutsideClickHandler>

                    {/*Profile Pic Modal && Button*/}
                  
                    <OutsideClickHandler     
                        onOutsideClick={() => {
                            setpopProfile(false);
                        }}
                        >
                        <div className="cursor-pointer inline-flex items-center justify-center p-1 rounded-full sm:hover:bg-gray-100 mx-1"
                     onClick={ () => 
                     {setpopProfile(!popProfile)}
                     }>
                     
                        <img src={user.result.dpUrl}  className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                                             
                        <span className="hidden md:inline-flex w-full mx-2 font-light text-sm">{user.result.name}</span>
                        </div>

                     {popProfile && <ProfileModal setpopProfile= {setpopProfile}/>}
                    
                    </OutsideClickHandler>
                    
                    
                   
                    
                    
                    
                </div>
                }
            </div>

                <div className="xl:hidden  mx-3 items-center flex justify-around">
                    
                    {/* Rankings Leftbar Mobile Modal */}
                    <div>
                         <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopRankings(false);
                            }}
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopRankings(!popRankings)}
                            }>
                            <HashtagIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {popRankings && <LeftbarMob setshowRankings={setpopRankings}/>}
                            
                        </OutsideClickHandler> 
                    </div>
                
                    <div className="sm:hidden flex justify-center items-center rounded-full w-full mx-2 my-1 bg-gray-100">

                        
                        <div className="p-1 bg-gray-400 hover:bg-cyan-400 rounded-full items:center">
                             <SearchIcon className= 'h-6 text-white'/>
                            
                        </div>
                        <input className ="bg-transarent w-full h-7 md:inline-flex pl-2 pr-4 bg-transparent items-center outline-none font-light placeholder-gray-400"
                        type="text"
                        placeholder="Search Zoorura"/>
                       
                    </div>

                    {/* <div>
                              <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }}
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopContacts(!popContacts)}
                            }>
                            <UsersIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {popContacts && <RightbarMob setshowContacts={setpopContacts}/>}
                            
                        </OutsideClickHandler>    
                    </div> */}
                </div>

        </div>
                    


                    {/* POINTERRRRRRRRR */}

                 {popDailyPoints &&
                    <div className="fixed border-l-8 border-gray-200 p-4  w-full rounded-xl sm:rounded-none mt-6 h-full sm:mt-2  top-0 z-0 flex justify-center bg-gray-200 opacity-80">
                            <div className="p-1 m-auto overflow-scroll">

                                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl bg-gray-100 items-center mt-0 mb-3 group">
                                    <img src={user.result.dpUrl} alt="DP" className="mx-auto rounded-full group-hover:text-white h-12 w-12"/>
                                    <p className= "text-gray-500 leading-4 text-center text-sm font-bold"> CONGRATULATIONS!</p> 
                                    <div className="bg-gray-200 rounded-md p-3 items-center"> 
                                        <p className= "text-gray-800 leading-4 text-center text-xs font-light">We are happy to Award You</p> 
                                        <p className= "text-gray-600 leading-4 text-center text-sm font-bold"> 10 Daily Points </p>                                       
                                    </div>                                   
                                </div>  
                                {/* <p className= "text-gray-500 pt-3 text-center text-lg font-bold">Thank you For Logging in Today</p> */}
                               
                                <div onClick= {handlePointer} className="bg-teal-400 hover:bg-teal-500 cursor-pointer w-20 mx-auto m-2 rounded-md py-1 items-center"> 
                                        <p className= "p-2 text-gray-100 leading-4 text-center font-bold"> CLAIM </p>                                       
                                    </div>  

                                <p className= "text-gray-700 text-center text-xs font-light p-1">More in the next 24 Hours</p> 
                                
                            </div>
                        </div>
                    } 



                   
            </div>
       
    
 
       
            
        
    )
}

export default Header;
