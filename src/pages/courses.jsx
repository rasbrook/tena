import React from "react";
import { maincolor } from "../components/constant/color";
import Coursebox from "../components/course";

const Course = (props) => {
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
        <div style={{ backgroundColor: maincolor }}>
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

export default Course