"use client";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import axiosInstance from "../Instance/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { get } from "axios";
import { useRouter } from "next/navigation";
import { Cookie } from "next/font/google";


export default function TaskDetail() {

    const router = useRouter();
    const userId = Cookies.get("UserId");

    const [day, setday] = useState(0);
    const [hour, sethour] = useState(0);
    const [mint, setmint] = useState(0);
    const [sec, setsec] = useState(0);

    const [task, setTask] = useState<any>(null);
    const [time, settime] = useState<any[]>([]);
    const taskId = Cookies.get('taskId');

        useEffect(() => {

       
       const fetchdata = async() => {
            if (taskId) {
            await axiosInstance.get(`/tasks/${taskId}`)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => console.error("Error fetching task:", error));
            }
        }
        fetchdata();
        }, []);

        useEffect(() => {
        if (task?.day && task?.deadline) {
            const createdDate = new Date(task.day).toISOString().slice(0, 10);
            const deadlineDate = new Date(task.deadline).toISOString().slice(0, 10);
            settime([createdDate, deadlineDate]);
        }

         if (task?.started && task?.deadline  && !isNaN(Date.parse(task.deadline))) {
                const interval = setInterval(() => {
                const deadlineDate = new Date(task.deadline);
                const diffMs = Math.max(0, deadlineDate.getTime() - new Date().getTime());

                const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
                const seconds = Math.floor((diffMs / 1000) % 60);

                setday(days);
                sethour(hours);
                setmint(minutes);
                setsec(seconds);
                console.log("Updating countdown...");
                }, 1000);

                return () => clearInterval(interval);
            }
            console.log("seconds",sec);

        }, [task]);
        

        const taskStarted =async ()=> {
            
            const today = new Date();
            const updatedTask = {
                ...task,
                startedAt: today,
                started: true,
                userId: userId,
            };
            try {
                const updated = await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
                await axiosInstance.get(`/tasks/${taskId}`)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => console.error("Error fetching task:", error));
                
                
            } catch (error) {
                console.log(error);
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
              <li><a>Homepage</a></li>
              <li><a href="/Profile">Portfolio</a></li>
              <li><a>About</a></li>
              <li><a href="#footer" className="link link-hover">Contact</a></li>
            </ul>
          </div>
        </div>


        <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="../">TaskManager</a>
            
            
        </div>

        <div className="navbar-end space-x-2">

        {/* Notification Button */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>


          {/* User Profile Section */}
          <div className="avatar ml-6">
            <div className="ring-primary ring-offset-base-80 w-8 rounded-full ring-2 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
            </div>
            <div>
                <a href="/Profile" className="btn btn-ghost btn-sm">Spiderman</a>
            </div>
        </div>
      </div>

      {/* #Navbar section  */}


      {/* #Hero section */}
    <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://as1.ftcdn.net/v2/jpg/11/47/05/68/1000_F_1147056882_ePu17W5fnRlvQJuhskp6T6vbAU5shifx.jpg)",
        }}>
            
        <div className="flex flex-wrap justify-center gap-8 mt-2">

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                    {task ? (
                            <>
                                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                                    <h1 className="text-5xl font-bold">{task.title}</h1>
                                    
                                    <div className="grid grid-flow-col gap-4 text-center auto-cols-max border border-red-400">
                                        <div className="flex flex-col items-center px-2 py-1 rounded text-neutral-content text-xs">
                                        <span className="countdown font-mono text-3xl">
                                            <span style={{ "--value": day } as React.CSSProperties }>{day}</span>
                                        </span>
                                        days
                                        </div>
                                        <div className="flex flex-col items-center px-2 py-1 rounded text-neutral-content text-xs">
                                        <span className="countdown font-mono text-3xl">
                                            <span style={{ "--value": hour } as React.CSSProperties }>{hour}</span>
                                        </span>
                                        hours
                                        </div>
                                        <div className="flex flex-col items-center px-2 py-1 rounded text-neutral-content text-xs">
                                        <span className="countdown font-mono text-3xl">
                                            <span style={{ "--value": mint } as React.CSSProperties }>{mint}</span>
                                        </span>
                                        min
                                        </div>
                                        <div className="flex flex-col items-center px-2 py-1 rounded text-neutral-content text-xs">
                                        <span className="countdown font-mono text-3xl">
                                            <span style={{ "--value": sec } as React.CSSProperties }>{sec}</span>
                                        </span>
                                        sec
                                        </div>
                                    </div>
                                </div>
                                <br/><br/><br/>

                                <p className="text-2xl font-bold">{task.description}</p><br/><br/><br/>
                                <table className="w-half text-left text-sm text-white-700">
                                    <tbody>
                                        <tr className="py-2">
                                        <th className="pr-4 font-medium">Task Created At</th>
                                        <td className="px-2 font-semibold">:</td>
                                        <td className="text-right">{time[0]}</td>
                                        </tr>
                                        <tr className="py-2">
                                        <th className="pr-4 font-medium">Deadline</th>
                                        <td className="px-2 font-semibold">:</td>
                                        <td className="text-right">{time[1]}</td>
                                        </tr>
                                        <tr className="py-2">
                                        <th className="pr-4 font-medium">Task Status</th>
                                        <td className="px-2 font-semibold">:</td>
                                        <td className="text-right">{task.started ? "✅ Started" : "⏳ Not started"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br/><br/>
                                <div className="flex justify-center">
                                <button className="btn btn-primary" onClick={()=>{taskStarted()}}>Get Started</button>
                                </div>
                            </>
                            ) : (
                            <p className="text-center text-xl">Loading task...</p>
                            )}
                    </div>
                </div>
            </div>            
        </div>
        


    </div>
      {/* #Hero section */}

      {/* #Features section }
      <div className="container mx-auto my-10">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/feature1.jpg"
                alt="Feature 1"
                width={400}
                height={300}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Feature 1</h2>
              <p>Brief description of Feature 1.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/feature2.jpg"
                alt="Feature 2"
                width={400}
                height={300}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Feature 2</h2>
              <p>Brief description of Feature 2.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/feature3.jpg"
                alt="Feature 3"
                width={400}
                height={300}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Feature 3</h2>
              <p>Brief description of Feature 3.</p>
            </div>
          </div>
        </div>
      </div>

      { #Features section */}
      


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
