import React, { useEffect, useState } from "react";
import { backgroundcolor, maincolor } from "../components/constant/color";
import Coursebox from "../components/course";
import { supabase } from "../../supabase";

const Course = (props) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState([]);

    const getCourse = async () => {
        try {
            const { data, error } = await supabase
                .from('Courses')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                setModules(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getCourse();
    }, []);

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            const sessionData = JSON.parse(session);
            supabase.auth.setSession(sessionData.token);
            setUser(sessionData);
        }
    }, []);

    console.log(user);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexWrap: "wrap", gap: 10, marginTop: 100 }}>

            {modules.map((module) => (
                <Coursebox key={module.id} module={module} title={module.title} />
            ))}

        </div>
    );
};

export default Course;
