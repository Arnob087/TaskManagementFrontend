import Image from "next/image";

export default function Home() {
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

          {/* Sign Up Button */}
          <button className="btn btn-outline btn-primary btn-sm"><a href="/Signup">Sign Up</a></button>

          {/* Log In Button */}
          <button className="btn btn-primary btn-sm"><a href="/Login">Log In</a></button>
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
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              This is a simple task management application built with Next.js, Tailwind CSS, and DaisyUI. It allows you to create, manage, and track your tasks efficiently. Enjoy the power of our app.
            </p>
            <a href="/Signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </div>
      {/* #Hero section */}

      {/* #Features section */}
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

      {/* #Features section */}


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
