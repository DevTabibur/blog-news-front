import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ContextData } from "contexts/dataProviderContext";

const Navbar = () => {
  const { currentlyLoggedIn } = useContext(ContextData)
  // hooks

  // Add active class
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    const url = `http://localhost:8000/api/v1/auth/log-out/${currentlyLoggedIn?._id}`
     fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
      ,
      body: JSON.stringify({ userId: currentlyLoggedIn?._id })
    })
      .then(res => res.json())
      .then(data => {
        // console.log('log out data', data);
        if (data.statusCode === 200) {
          localStorage.removeItem("accessToken");
          toast.success(data?.message)

          router.push("/");
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }
      })

  };

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router]);

  const cart = useSelector((state) => state.cart);
  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("header");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <header id="header" className="headroom">
        <div className="startp-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/" className="navbar-brand">
                <img src="/images/logo.png" alt="logo" />
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link
                      href="/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/" && "active"
                        }`}
                    >
                      Home
                    </Link>
                  </li>


                  <li className="nav-item">
                    <Link
                      href="/projects/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/projects/" && "active"
                        }`}
                    >
                      Projects
                    </Link>


                  </li>
                  <li className="nav-item">
                    <Link
                      href="/services/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/services/" && "active"
                        }`}
                    >
                      Services
                    </Link>


                  </li>





                  <li className="nav-item">
                    <Link
                      href="/blogs/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/blogs/" && "active"
                        }`}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/pricing/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/pricing/" && "active"
                        }`}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/about-us/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/about-us/" && "active"
                        }`}
                    >
                      About us <Icon.ChevronDown />
                    </Link>

                    <ul className="dropdown-menu">

                      <li className="nav-item">
                        <Link
                          href="/about-us/"
                          onClick={toggleNavbar}
                          className={`nav-link ${currentPath == "/about-us/" && "active"
                            }`}
                        >
                          About us
                        </Link>


                      </li>
                      <li className="nav-item">
                        <Link
                          href="/career/"
                          onClick={toggleNavbar}
                          className={`nav-link ${currentPath == "/" && "active"
                            }`}
                        >
                          Career
                        </Link>

                      </li>


                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/contact/"
                      onClick={toggleNavbar}
                      className={`nav-link ${currentPath == "/contact/" && "active"
                        }`}
                    >
                      Contact
                    </Link>
                  </li>


                </ul>
              </div>

              {/* Others option */}
              <div className="others-option">



                {currentlyLoggedIn?.email && <Link href="/dashboard/" className="btn btn-light me-3">
                  Dashboard
                </Link>}



                {currentlyLoggedIn?.email ? <> <Link href="#" onClick={handleLogout} className="btn btn-primary">
                  Logout
                </Link></> : <>
                  <Link href="/auth/login/" className="btn btn-primary">
                    Login
                  </Link>
                </>}




              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}


export default Navbar
