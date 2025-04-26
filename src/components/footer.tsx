import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";
import { Accent, backgroundcolor, fontColor } from "../constant/color";

interface FooterProps {
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

const Footer = ({
    socialLinks = {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
    },
}: FooterProps) => {
    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about-us" },
        { name: "Stories", href: "/Stories" },
        { name: "Contact", href: "/contact" },
    ];

    const socialIcons = [
        { icon: Facebook, href: socialLinks.facebook },
        { icon: Twitter, href: socialLinks.twitter },
        { icon: Instagram, href: socialLinks.instagram },
        { icon: Linkedin, href: socialLinks.linkedin },
    ];

    return (
        <footer style={{
            width: '100vw',
            backgroundColor: `${Accent}88`,
            justifyContent: 'center',
            justifyItems: 'center',
            alignSelf: 'center',
            borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            <div style={{
                width: '100vw',
                backgroundColor: `${Accent}88`,
                justifyContent: 'space-between',
                justifyItems: 'center',
                alignSelf: 'center',
                gap: 10,
                margin: "0 auto",
                padding: "3rem 1rem"
            }}>
                <div style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    gridTemplateColumns: "repeat(1, 1fr)",
                    gap: "10rem",
                    marginBottom: "2rem",
                    justifyContent: 'space-between',

                }}>
                    {/* Logo & Description */}
                    <div>
                        <h3 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #60a5fa, #9333ea)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "1rem"
                        }}>
                            Yekerestos Bet
                        </h3>
                        <p style={{
                            fontSize: "1rem",
                            color: fontColor,
                            marginBottom: "1rem",
                            maxWidth: "32rem"
                        }}>
                            Empowering communities through sustainable development and
                            positive change.
                        </p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            {socialIcons.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: "#9CA3AF" }}
                                >
                                    <social.icon style={{ height: "1.25rem", width: "1.25rem" }} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div
                        style={{ justifySelf: 'center' }}
                    >
                        <h4 style={{
                            fontSize: "1.125rem",
                            fontWeight: "600",
                            color: fontColor,
                            marginBottom: "1rem",
                            textAlign: 'start'
                        }}>
                            Quick Links
                        </h4>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        style={{
                                            fontSize: "1rem",
                                            color: "#9CA3AF",
                                            textDecoration: "none",
                                            textAlign: 'start'
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div
                        style={{ justifySelf: 'center' }}
                    >
                        <h4 style={{
                            justifyItems: 'end',
                            fontSize: "1.125rem",
                            fontWeight: "600",
                            color: "white",
                            marginBottom: "1rem"
                            , textAlign: 'end'
                        }}>
                            Contact Us
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {/*<p style={{ fontSize: "1rem", color: "#9CA3AF", textAlign: 'end' }}>123 Impact Street</p>*/}
                            <p style={{ fontSize: "1rem", color: "#9CA3AF", textAlign: 'end' }}>addis Abeba, Ethiopia</p>
                            <p style={{ fontSize: "1rem", color: "#9CA3AF", textAlign: 'end' }}>contact@yekerestosbet.org</p>
                            <p style={{ fontSize: "1rem", color: "#9CA3AF", textAlign: 'end' }}>+25190000000</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: "2rem",
                    marginTop: "2rem",
                    textAlign: "center"
                }}>
                    <p style={{
                        fontSize: "0.875rem",
                        color: "#9CA3AF"
                    }}>
                        © {new Date().getFullYear()} Yekerestos Bet. Made with{" "}
                        <Heart style={{
                            height: "1rem",
                            width: "1rem",
                            display: "inline-block",
                            color: "#EF4444"
                        }} /> for a better world.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
