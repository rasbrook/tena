import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabaseTeach } from "../../supabase";
import { maincolor, seconderycolor, Accent, backgroundcolor, fontColor } from "../components/constant/color";

const Content = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);

    const getContent = async () => {
        let { data: content, error } = await supabaseTeach
            .from("content")
            .select("*")
            .eq("id", id);

        if (!error) setContent(content[0]);
        setLoading(false);
    };

    useEffect(() => {
        getContent();
    }, []);

    if (loading) return <h1 style={{ textAlign: "center", marginTop: 50, color: fontColor }}>Loading...</h1>;

    return (
        <div style={{
            maxWidth: 900,
            margin: "50px auto",
            padding: "20px",
            backgroundColor: backgroundcolor,
            color: fontColor,
            borderRadius: 10,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>

            {/* Video Section */}
            <div style={{
                position: "relative",
                width: "100%",
                borderRadius: 10,
                overflow: "hidden",
                border: `3px solid ${Accent}`
            }}>
                <video
                    style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
                    src={`https://fitzygwmvtezlixlvnmn.supabase.co/storage/v1/object/public/video/${content.Video}`}
                    type="video/mp4"
                    controls
                />
            </div>

            {/* Lesson Details */}
            <h2 style={{ marginTop: 20, color: maincolor }}>{content.name}</h2>

            {/* Description */}
            <p style={{
                marginTop: 10,
                fontSize: "16px",
                color: fontColor,
                backgroundColor: `${seconderycolor}22`,
                padding: "10px",
                borderRadius: "5px"
            }}>
                {content.description ? content.description : "No description available for this lesson."}
            </p>

            {/* Extra Notes */}
            {content.note && (
                <a href={`https://fitzygwmvtezlixlvnmn.supabase.co/storage/v1/object/public/pdf/${content.note}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", marginTop: 10, color: seconderycolor, fontWeight: "bold", textDecoration: "none" }}>
                    📄 Download Lesson Notes
                </a>
            )}

            {/* Course Metadata */}
            <div style={{ marginTop: 20, fontSize: 14, color: Accent }}>
                <p>📅 Created: {new Date(content.created_at).toLocaleDateString()}</p>
                <p>📚 Course ID: {content.course_id}</p>
                <p>🎓 Instructor ID: {content.instructer_id}</p>
            </div>
        </div>
    );
};

export default Content;