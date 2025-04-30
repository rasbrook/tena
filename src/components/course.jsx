import React from "react";
import { Accent, backgroundcolor, maincolor, seconderycolor } from "../components/constant/color";
import { motion } from "framer-motion";

const Coursebox = (props) => {
    return (
        <motion.div whileHover={{ backgroundColor: `${Accent}55`, cursor: 'pointer' }} style={{ backgroundColor: seconderycolor, width: 250, borderRadius: 5 }}>
            <motion.h3 style={{ padding: 20, textAlign: 'center' }}>{props.title}</motion.h3>
        </motion.div>
    );
};

export default Coursebox;


