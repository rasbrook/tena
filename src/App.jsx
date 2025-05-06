import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Header from "./components/header/header"
import { Accent, backgroundcolor, fontColor, maincolor, seconderycolor } from "./components/constant/color"
import Home from "./pages/home"
import Mycourse from "./pages/mycourse"
import { useEffect, useState } from "react"
import SignUp from "./pages/signup"
import logo from './assets/tenalogo.jpg'
import Login from "./pages/login"
import { supabase } from '../supabase';
import Course from "./pages/courses"
import { motion } from "framer-motion"
import Profile from "./pages/profile"
import Footer from "./components/footer"


function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionData = JSON.parse(session);
      supabase.auth.setSession(sessionData.token);
      setUser(sessionData);
    }
  }, []);


  return (
    <BrowserRouter>
      <Header
        mainstyle={{ overFlow: 'hidden' }}
        backgroundcolor={backgroundcolor}
        name={'Tenapedia'}
        logostyle={{ width: 80, height: 70 }}
        linkstyleondrop={{ fontSize: 24 }}
        linkstyleonbig={{ fontSize: 20 }}
        color={fontColor}
        middleelement={<div style={{ alignContent: 'center', alignItems: 'center' }}><input style={{ height: 20, backgroundColor: `${maincolor}55`, border: 'none', marginRight: 10, borderRadius: 20, padding: 10 }} /></div>}
        logo={logo}
        // bigmiddleelement={<div style={{ left: 0, width: 100 }}><input /></div>}
        rightCornerComponent={<motion.button whileHover={{ scale: 1.05, cursor: 'pointer' }} style={{ minWidth: 70, height: 40, alignSelf: 'center', border: 'none', fontSize: 16, borderRadius: 8, backgroundColor: maincolor, color: "white", marginRight: 20 }}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/signup'}>Log In</Link></motion.button>}

        dropdownstyle={{ justifyContent: 'center', backgroundColor: `white` }}
        //Bottomofdropdown={<button style={{ textAlign: 'center', backgroundColor: `${seconderycolor}` }}>Donate</button>}
        CompanyColor={maincolor}
        pages={user ? ['Dashboard', 'My-Course', "Profile", 'Course'] : ['Dashboard', 'Course']}
        hovereffectonnav={{ color: `${maincolor}`, scale: 1.2, fontWeight: 600 }} />

      {user ? <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Dashboard" element={<Home />} />
        <Route path="/My-Course" element={<Mycourse />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes> : <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Dashboard" element={<Home />} />
      </Routes>
      }
      <Footer />
    </BrowserRouter>




  )
}

export default App
