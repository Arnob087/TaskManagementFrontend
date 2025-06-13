'use client';

import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Signup() {

    interface users{
      name: string;
      email: string;
      password: string;
    }
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSignup = async () => {
      const user: users = {
        name,
        email,
        password
      };
      try {

        const response = await axios.post('http://localhost:3000/users', user);
        
        setAlert({ type: 'success', message: 'Signup successful!' })
        router.push('/Login'); // Redirect to login page after successful signup
      } 
      catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || 'Signup failed!';
        setAlert({ type: 'error', message: errorMessage });
      }
    }
  

  



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
        className="hero min-h-screen bg-cover bg-center"
        style={{
            backgroundImage:
            "url(https://as1.ftcdn.net/v2/jpg/11/47/05/68/1000_F_1147056882_ePu17W5fnRlvQJuhskp6T6vbAU5shifx.jpg)",
        }}
        >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="card-body max-w-md mx-auto bg-base-100 bg-opacity-90 rounded-lg p-8 shadow-lg">
            <h2 className="text-center text-5xl font-bold mb-6">Register</h2>

            {alert && (
              <div role="alert" className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{alert.message}</span>
              </div>
            )}


            <form className="space-y-4" onSubmit={(e) => {handleSignup(); e.preventDefault();}}>
            {/* Name Input */}
            <div className="form-control mb-4">
                <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
                </label>
                <input
                type="text"
                id="name"
                placeholder="Your full name"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            {/* Email Input */}
            <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
                </label>
                <input
                type="email"
                id="email"
                placeholder="email@example.com"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            {/* Password Input */}
            <div className="form-control mb-6">
                <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
                </label>
                <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            {/* Submit Button */}
            <div className="form-control">
                <button type="submit" className="btn btn-primary">
                Register
                </button>
            </div>
            </form>


            <p className="text-left font-bold mt-10 text-sm">
            Already have an account?{' '}
            <a href="/Login" className="link link-warning">
                Log In
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
    
    </>
  );
}