import React from "react";
import { motion } from "framer-motion";
import { Accent, fontColor, seconderycolor } from "../constant/color";

export interface SuccessStory {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    location: string;
}

interface SuccessStoryCardProps {
    story: SuccessStory;
}

const SuccessStoryCard = ({
    story = {
        id: "1",
        title: "Village Water Project",
        description: "Bringing clean water to over 1000 residents",
        imageUrl:
            "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800",
        date: "March 2024",
        location: "Rural Karnataka, India",
    },
}: SuccessStoryCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            style={{
                backgroundColor: `${Accent}55`,
                backdropFilter: "blur(12px)",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                width: 300
            }}
        >
            {/* Image Container */}
            <div style={{
                position: "relative",
                height: "192px",
                overflow: "hidden"
            }}>
                <img
                    src={story.imageUrl}
                    alt={story.title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Location Overlay */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                    padding: "16px"
                }}>
                    <p style={{
                        fontSize: "0.875rem",
                        color: "rgb(197, 197, 197)"
                    }}>
                        {story.location}
                    </p>
                </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: "24px" }}>
                {/* Date */}
                <div style={{
                    fontSize: "0.875rem",
                    color: seconderycolor,
                    marginBottom: "8px"
                }}>
                    {story.date}
                </div>
                {/* Title */}
                <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: fontColor,
                    marginBottom: "12px"
                }}>
                    {story.title}
                </h3>
                {/* Description */}
                <p style={{
                    fontSize: "1rem",
                    color: fontColor
                }}>
                    {story.description}
                </p>
            </div>
        </motion.div>
    );
};

export default SuccessStoryCard;
