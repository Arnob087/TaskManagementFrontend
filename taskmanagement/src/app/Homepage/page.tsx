"use client";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import axiosInstance from "../Instance/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { get } from "axios";
import { useRouter } from "next/navigation";

export default function Homepage() {



    const token = Cookies.get('accessToken');
    const getWeekNumber = (date: Date): number => {
          const dayofmonth = date.getDate();
            if (dayofmonth <= 7) {
                return 1; 
            } else if (dayofmonth <= 14) {
                return 2; 
            }
            else if (dayofmonth <= 21) { 
                return 3; 
            }
            else {
                return 4; 
            } 
          }

    const todayWeekNumber = getWeekNumber(new Date());
    const router = useRouter();

    const [selectedDayTasks, setSelectedDayTasks] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState(String(todayWeekNumber));
    const [tasks, setTasks] = useState<any[]>([]);
    const [user, setuser] = useState<any>(null);


        useEffect(() => {
        const today = new Date();
        const formatted = today.toISOString().slice(0, 7); 
        setSelectedMonth(formatted);
        
        
          if (token && token.split('.').length === 3) {
                const decoded = jwtDecode(token);
            try {
                
                Cookies.set('UserId', String(decoded.sub ?? ''), {
                    expires: 1,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                } catch (err) {
                console.error("Error decoding JWT:", err);
                }
            } 
            else {
                console.warn("Invalid or missing token:", token);
            }

        const userId = Cookies.get('UserId');
        if (userId) {
           axiosInstance.get(`/tasks/user/${userId}`)
            .then(response => {
                setTasks(response.data as any[]);
            })
            .catch(error => console.error("Error fetching tasks:", error));
        }
        if (userId) {
            axiosInstance.get(`/users/${userId}`)
                .then(response => {
                    setuser(response.data);
                })
                .catch(error => console.error("Error fetching task:", error));
            }
        
        


        }, []);

        const groupedDayTasks: any[][] = [[], [], [], []];

        

        
         tasks.forEach(task => {
            const taskDate = new Date(task.day);
            const weekNumber = getWeekNumber(taskDate);
            const taskMonth = taskDate.toISOString().slice(0, 7);
            if( taskMonth == selectedMonth) {
              if (weekNumber == Number(selectedWeek)) {
                const dayIndex = taskDate.getDay(); 
                if (dayIndex >= 0 && dayIndex < 4) { 
                    groupedDayTasks[dayIndex].push(task);
                }
              }
            }
            console.log("Grouped Tasks:", groupedDayTasks);
          }
        );



        const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
        };

        const handle_tasks = (tasksForDay: any[]) => {
          setSelectedDayTasks(tasksForDay);
          setShowModal(true);
        };

       const SingleTaskDetail = (task: any) => {
          Cookies.set('taskId', String(task.id), {
            expires: 1,
          });

          router.push('/TaskDetail');
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
              <li><a>Homepage</a></li>
              <li><a href="/Profile">Portfolio</a></li>
              <li><a>About</a></li>
              <li><a href="#footer" className="link link-hover">Contact</a></li>
            </ul>
          </div>

          

            {/* Month Selection Input */}
            <div className="ml-4">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="input input-sm input-bordered"
                />
            </div>
        </div>


        <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="../">TaskManager</a>
            
            
        </div>

        <div className="navbar-end space-x-2">


          {/* Dropdown for Week Selection */}
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">{`Week ${selectedWeek}`}</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => { setSelectedWeek("1")}}>Week 1</a></li>
                    <li><a onClick={() => {setSelectedWeek("2")}}>Week 2</a></li>
                    <li><a onClick={() => {setSelectedWeek("3")}}>Week 3</a></li>
                    <li><a onClick={() => {setSelectedWeek("4")}}>Week 4</a></li>
                </ul>
            </div>

        
          {/* Search Button */}
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button> 
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


          {/* User Profile Section */}
          <div className="avatar ml-6">
            <div className="ring-primary ring-offset-base-80 w-8 rounded-full ring-2 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
            </div>
            <div>
                <a href="/Profile" className="btn btn-ghost btn-sm">{user?.name}</a>
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
            {groupedDayTasks.map((dayTasks, index) => (
                <div key={index} className="card w-72 bg-base-100 shadow-sm">
                <div className="card-body">
                    <h2 className="text-3xl font-bold">Day : {index + 1}</h2>

                    {/* Render all tasks for this day */}
                    {dayTasks.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {dayTasks.map((task: any, i: number) => (
                        <li key={i} className="text-sm">
                             {task.title|| 'Untitled Task'}{"  "}{task.completed ? "✅Completed" : "❌Not completed"}
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-gray-400 mt-4 text-sm">No tasks</p>
                    )}

                    <div className="mt-6">
                    <button className="btn btn-primary btn-block" onClick={() => handle_tasks(dayTasks)}>View Details</button>
                    </div>
                </div>
              </div>
            ))}
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
      

      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black rounded-lg p-6 w-[90%] max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Task Details</h3>
                <button className="text-red-500 font-bold" onClick={() => setShowModal(false)}>✕</button>
              </div>
              {selectedDayTasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table w-full table-zebra">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th> Created Date</th>
                        <th> Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDayTasks.map((task, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{task.title || task.name || 'Untitled'}</td>
                          <td>{task.description || 'No description'}</td>
                          <td>{task.completed ? '✅ Completed' : '❌ Not Completed'}</td>
                          <td>{new Date(task.day).toLocaleDateString()}</td>
                          <td>{new Date(task.deadline).toLocaleDateString()}</td>
                          <td><button className="btn btn-primary btn-sm" onClick={() => SingleTaskDetail(task)}>See Task</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No task details available.</p>
              )}
            </div>
          </div>
        )}



    
    
    </>
  );
}
