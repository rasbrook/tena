import React, { useEffect, useState } from "react";
import { supabase, supabaseTeach } from "../../supabase";
import i1 from '../assets/student.jpg'
import i2 from '../assets/student2.jpeg'
import i3 from '../assets/student3.jpg'
import i4 from '../assets/student6.jpeg'
import i5 from '../assets/student4.jpg'
import i6 from '../assets/student5.jpg'
import i7 from '../assets/student7.jpg'
import i12 from '../assets/s1.jpg'
import i11 from '../assets/s2.jpg'
import i8 from '../assets/s3.jpg'
import i9 from '../assets/s4.jpg'
import i10 from '../assets/s5.jpg'
import n1 from '../assets/nursing 2.png'
import n2 from '../assets/nursing 3.png'
import n3 from '../assets/nursing 4.png'
import n4 from '../assets/nursing 5.png'
import n9 from '../assets/nursing 6.png'
import n5 from '../assets/nursing 7.png'
import n6 from '../assets/nursing 9.png'
import n7 from '../assets/nursing 12.png'
import n8 from '../assets/nursing 11.png'

import AutoScrollGalleryLeft from "../components/autoscrollgalleryleft";
import AutoScrollGalleryRight from "../components/autoscrollgalleryright";
import { maincolor } from "../components/constant/color";
import { motion } from "framer-motion";
import Coursebox from "../components/course";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const Home = (props) => {
    const nav = useNavigate()
    const [content, setContent] = useState([])
    const [f, setF] = useState()
    const [inprogress, setInprogress] = useState(false)
    const [user, setUser] = useState()
    const images = [i5, i6, i7, i8, i9, i1, i2, i3, i4, i5, i6, i7, i1, i2, i3, i4, i10, i11, i12]
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
    const get_contents = async () => {
        setLoading(true)

        let { data: content, error } = await supabaseTeach
            .from('content')
            .select('*')
        console.log(content)
        console.log(error)
        setContent(content)
        setLoading(false)


    }
    console.log(course)
    useEffect(() => {
        get_course()
        get_contents()


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
        const figure_list = [n1, n2, n3, n4, n5, n6, n7, n8, n9]
        const figure = figure_list[Math.floor(Math.random() * figure_list.length)]
        setF(figure)

    }, []);



    console.log(user)
    if (inprogress) {
        return <div style={{ backgroundColor: 'black', height: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: 'white', }}>Our website is under construction, We Are Preparing Big Things For Our Students,  Please Come Back A Month.</h1>
        </div>
    }
    if (loading) {
        return <>
            <h1>Loading</h1>
        </>
    }

    return (

        <div >
            <h1 style={{ fontSize: 50, marginTop: 100, position: 'absolute' }}>ጤና-ፒዲያ</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', marginTop: 150, gap: 50 }}>
                    <div style={{ width: '80vw', minWidth: 400, maxWidth: 500 }}>
                        <AutoScrollGalleryRight images={images} duration={100} />
                    </div>
                    <img src={f} style={{ width: '90vw', maxWidth: 500 }} />
                </div>
                {/* <div style={{ zIndex: 999, width: '40vw', margin: 20, marginTop: 100 }}>
                    <h1 style={{ color: maincolor, fontSize: 46 }}>Achieve Your Career Goals with Tenapedia </h1>
                    {user ? <></> : <motion.button whileHover={{ scale: 1.05, cursor: 'pointer' }} style={{ minWidth: 250, height: 50, alignSelf: 'center', border: 'none', fontSize: 16, padding: 15, borderRadius: 8, backgroundColor: maincolor, color: "white" }}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/signup'}>Start Your 14 day free Trial</Link></motion.button>}
                </div>*/}
            </div>
            <h1 style={{ textAlign: 'center' }}>We are preparing Big things for our students ! Our website is under construction. Please come back later.</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 30 }}>
                {course.map((i) => (
                    <div onClick={() => console.log(i.id)} key={i.id}>
                        <Coursebox title={i.title} />
                    </div>

                ))}
            </div>

            <div style={{ display: "flex", gap: 20, marginBottom: 200, flexWrap: 'wrap' }}>
                {content.map((i) => (
                    <div
                        key={i.id}
                        onClick={() => nav(`/Content/${i.id}`)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 600,
                            cursor: "pointer",
                            backgroundColor: `${maincolor}44`,
                            borderRadius: 8,
                            paddingBottom: 10,
                            transition: "0.3s",
                        }}
                    >
                        {/* Video Thumbnail */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: 300,
                                borderRadius: 8,
                                overflow: "hidden"
                            }}
                        >
                            <video
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 8,
                                }}
                                src={`https://fitzygwmvtezlixlvnmn.supabase.co/storage/v1/object/public/video//${i.Video}`}
                                type="video/mp4"

                            />
                        </div>


                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10,
                                paddingLeft: 10
                            }}
                        >
                            {/* Mock Profile Image */}
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "#ddd",
                                    marginRight: 10
                                }}
                            />

                            {/* Video Name */}
                            <h4
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#000"
                                }}
                            >
                                {i.name}
                            </h4>

                        </div>
                        <h6
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#000",
                                marginLeft: 10
                            }}
                        >
                            {i.description}
                        </h6>
                    </div>
                ))}
            </div>


        </div>

    );
};

export default Home;


