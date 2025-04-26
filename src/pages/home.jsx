import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import i1 from '../assets/student.jpg'
import i2 from '../assets/student2.jpeg'
import i3 from '../assets/student3.jpg'
import i4 from '../assets/student6.jpeg'
import i5 from '../assets/student4.jpg'
import i6 from '../assets/student5.jpg'
import i7 from '../assets/student7.jpg'
import AutoScrollGalleryLeft from "../components/autoscrollgalleryleft";
import AutoScrollGalleryRight from "../components/autoscrollgalleryright";
import { maincolor } from "../components/constant/color";
import { motion } from "framer-motion";
import Coursebox from "../components/course";
import { Link } from "react-router-dom";

const Home = (props) => {
    const [user, setUser] = useState()
    const images = [i1, i2, i3, i4, i5, i6, i7, i1, i2, i3, i4, i5, i6, i7]
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState([])
    const get_course = async () => {
        setLoading(true)

        let { data: Courses, error } = await supabase
            .from('Courses')
            .select('*')
        console.log(Courses)
        setCourse(Courses)
        setLoading(false)

    }
    console.log(course)
    useEffect(() => {
        get_course()


    }, [])
    useEffect(() => {
        setLoading(true)
        const session = localStorage.getItem('session');
        if (session) {
            const sessionData = JSON.parse(session);
            supabase.auth.setSession(sessionData.token);
            setUser(sessionData);
        }
        setLoading(false)
    }, []);


    console.log(user)
    if (loading) {
        return <>
            <h1>Loading</h1>
        </>
    }
    return (

        <div >
            <h1 style={{ fontSize: 50, marginTop: 100, position: 'absolute' }}>ጤና-ፒዲያ</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '50vw', marginTop: 150, minWidth: 400 }}>
                    <AutoScrollGalleryRight images={images} duration={100} />
                </div>
                <div style={{ zIndex: 999, width: '40vw', margin: 20, marginTop: 100 }}>
                    <h1 style={{ color: maincolor, fontSize: 46 }}>Achieve Your Career Goals with Tenapedia </h1>
                    {user ? <></> : <motion.button whileHover={{ scale: 1.05, cursor: 'pointer' }} style={{ minWidth: 250, height: 50, alignSelf: 'center', border: 'none', fontSize: 16, padding: 15, borderRadius: 8, backgroundColor: maincolor, color: "white" }}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/signup'}>Start Your 14 day free Trial</Link></motion.button>}
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 30 }}>
                {course.map((i) => (
                    <div onClick={() => console.log(i.id)} key={i.id}>
                        <Coursebox title={i.title} />
                    </div>

                ))}
            </div>
        </div>

    );
};

export default Home;


