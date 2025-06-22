'use client';
import axios from "axios";
import { useState } from "react";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';

export default function ForgetPassword() {
  interface Tokens{
    access_token: string;
  }
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setcode] = useState('');
  const [loading, setloading] = useState(false);
  const [newPassword, setNewpassword] = useState('');
  const [confirmpass, setconfirmpass] = useState(''); 


const getcode = async () => {
  try {
    setloading(true);
    const response = await axios.post('http://localhost:3000/auth/forgotpassword', {
      email
    });
    setcode("");

    document.getElementById('codetestmodal')?.click()    
  }
  catch (error) {
    alert('Email not found');
  }
  finally{
    setloading(false);
  }
};


const checkcode = async () => {
  try {
    setloading(true);
    const response = await axios.post('http://localhost:3000/auth/checkcode', {
      email,
      code
    });
    setcode("");
    setNewpassword("");
    setconfirmpass("");

     document.getElementById('resetpassword')?.click();   
  }
  catch (error) {
    alert('Invalid or expired code');
    setcode("");
  }
  finally{
    setloading(false);
  }
};

const changepass = async () => {
    if (!newPassword || !confirmpass) {
    alert("Please fill out both fields.");
    return;
  }
    if(newPassword!== confirmpass){
        alert("Passwords are not same.")
        setNewpassword("");
        setconfirmpass("");
        document.getElementById('resetpassword')?.click();   
    }
  try {
    setloading(true);
    if(newPassword){
        await axios.post('http://localhost:3000/auth/resetpassword', {
        email,
        newPassword
        });
        setNewpassword("");
        setconfirmpass("");
        router.push("/Login");
        }
  }
  catch (error) {
    alert(error);
    setNewpassword("");
    setconfirmpass("");
  }
  finally{
    setloading(false);
  }
};




  return (
    <>
      {/* #Navbar section */}
       <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li><a href="../" className="link link-hover">Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
              <li><a href="#footer" className="link link-hover">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <a className="btn btn-ghost text-xl" href="../">TaskManager</a>
        </div>

        <div className="navbar-end space-x-2">
          {/* Search Button */}
          {/* <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button> */}
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

          {/* Notification Button */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      {/* #Navbar section  */}


      {/* #Hero section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://as1.ftcdn.net/v2/jpg/11/47/05/68/1000_F_1147056882_ePu17W5fnRlvQJuhskp6T6vbAU5shifx.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="card-body max-w-md mx-auto bg-base-100 bg-opacity-90 rounded-lg p-8 shadow-lg">
            <h2 className="text-center text-5xl font-bold mb-6">Enter your mail</h2>
                <input className="input validator" type="email" required placeholder="mail@site.com" onChange={(e) => setEmail(e.target.value)}/>
                    <div className="validator-hint">Enter valid email address</div>
                <div className="form-control">
                    <button onClick={getcode} className="btn btn-primary mt-2">
                    {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                    'Send Reset Code'
                    )}
                </button>
                    </div>

                {/* Optional Sign Up Link */}
                <p className="text-left font-bold mt-10 text-sm">
                    Want to log in ?{' '}
                    <a href="/Login" className="link link-warning">
                    Log in
                    </a>
                </p>
                </div>
            </div>
      {/* #Hero section */}


      {/* #Footer section */}
      <footer id="footer" className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="text-lg font-bold">TaskManager</p>
          <p>© 2023 TaskManager. All rights reserved.</p>
        </div>
        <div>
          <p className="text-lg font-bold">Contact</p>
          <p>
            E-mail :{' '}
            <a href="mailto:taskmanager@gmail.com" className="link link-hover">
              taskmanager@gmail.com
            </a>
          </p>
          <p>Call : +1234567</p>
        </div>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="link link-hover">About Us</a>
          <a href="#" className="link link-hover">Privacy Policy</a>
          <a href="#" className="link link-hover">Terms of Service</a>
        </div>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="link link-hover">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h12zM8.5 11.5h7M8.5 15.5h7M8.5 19.5h7" />
            </svg>
          </a>
          <a href="#" className="link link-hover">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2m-4-8a2 2 0 100 4 2 2 0 000-4zM6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="#" className="link link-hover">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2m-4-8a2 2 0 100 4 2 2 0 000-4zM6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </footer>
      {/* #Footer section */}
      


    <input type="checkbox" id="codetestmodal" className="modal-toggle" />

        <div className="modal" role="dialog">
            <div className="modal-box bg-black text-white">
                <h3 className="font-bold text-lg mb-4">Enter Reset Code</h3>

                <input
                type="number"
                className="input input-bordered w-full validator mb-2"
                required
                placeholder="Enter the code sent to your email"
                min="000000"
                max="999999"
                title="Enter the code from your email"
                onChange={(e)=>{setcode(e.target.value)}}
                value={code}
                />
                <p className="text-sm text-gray-400 mb-4 validator-hint">
                Must be a 6-digit code
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm">Didn't get a code?</p>
                {<label htmlFor="codetestmodal" className="text-primary underline cursor-pointer">
                    Resend
                </label>}
                </div>

                <div className="modal-action mt-4">
                <label
                    htmlFor="codetestmodal"
                    className="btn btn-primary w-full"
                    onClick={() => {
                    checkcode();
                    }}
                >
                    Submit
                </label>
                </div>
            </div>
        </div>





    <input type="checkbox" id="resetpassword" className="modal-toggle" />

        <div className="modal" role="dialog">
            <div className="modal-box bg-black text-white">
                <h3 className="font-bold text-lg mb-4">Set New Password</h3>

                <p>New Password</p>
                <input type="password" className="input validator" required placeholder="New Password" minLength={1} value={newPassword}
                    //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"  onChange={(e)=>{setNewpassword(e.target.value)}}/>
                    <p className="validator-hint">
                    Must be more than 8 characters
                    </p>
                <p>Confirme Password</p>
                <input type="password" className="input validator" required placeholder="Confirm Password" minLength={1} value={confirmpass}
                    //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={(e)=>{setconfirmpass(e.target.value)}}/>
                    <p className="validator-hint">
                    Must be more than 8 characters, including
                    <br/>At least one number
                    <br/>At least one lowercase letter
                    <br/>At least one uppercase letter
                    </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm">Want to go Log In?</p>
                <label htmlFor="resetpassword" className="text-primary underline cursor-pointer">
                    <a href="/Login" >Log In</a>
                </label>
                </div>

                <div className="modal-action mt-4">
                <label
                    htmlFor="resetpassword"
                    className="btn btn-primary w-full"
                    onClick={() => {changepass();
                    }}
                >
                    Change Password
                </label>
                </div>
            </div>
        </div>

    
    
    </>
  );
};