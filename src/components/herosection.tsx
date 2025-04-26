


import React from "react";
import { Button } from "./button";
import { motion } from "framer-motion";
import { Accent, fontColor, maincolor, seconderycolor } from "../constant/color";

interface HeroSectionProps {
    backgroundImage?: string;
    missionStatement?: string;
    donateUrl?: string;
    volunteerUrl?: string;
}

const HeroSection = ({
    backgroundImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&auto=format&fit=crop",
    missionStatement = "Join the Church of Christ in Ethiopia as we grow in faith, community, and service to others.All are welcome in God's house",
    donateUrl = "#donate",
    volunteerUrl = "#volunteer",
}: HeroSectionProps) => {
    return (
        <div style={{ position: "relative", width: "100%", height: "600px", backgroundColor: "#0D0D0D" }}>
            {/* Background Image with Overlay */}
            <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                    src={backgroundImage}
                    alt="Hero Background"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), transparent)"
                }} />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(13, 13, 13, 0.3)",
                    backdropFilter: "blur(4px)"
                }} />
                {/* Animated gradient overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent, rgba(13, 13, 13, 0.1), rgba(13, 13, 13, 1))",
                    opacity: 0.8
                }} />
            </div>

            {/* Content Container */}
            <div style={{
                position: "relative",
                height: "100%",
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: "2rem",
                        lineHeight: "3rem",
                        fontWeight: 300,
                        background: `linear-gradient(to right, ${maincolor}, ${seconderycolor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "1.5rem",
                        maxWidth: "48rem"
                    }}
                >

                    {missionStatement}
                </motion.h1>
                <motion.p
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease', color: 'white' }}
                    whileHover={{ scale: 1.05, color: Accent }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    "Let your light shine before others..." - Matthew 5:16
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}
                >
                    <Button
                        size="lg"
                        style={{
                            background: `linear-gradient(to right, ${maincolor}, ${seconderycolor})`,
                            color: fontColor,
                            padding: "1.5rem 2rem",
                            fontSize: "1.125rem",
                            borderRadius: "9999px",
                            border: "none",
                            cursor: "pointer"
                        }}
                        asChild
                    >
                        <a href={donateUrl} style={{ color: "inherit", textDecoration: "none" }}>Donate Now</a>
                    </Button>

                </motion.div>
            </div>
        </div>)
}


export default HeroSection;