import React from "react";
import { motion } from "framer-motion";
import { Accent, maincolor, seconderycolor } from "../constant/color";
import { Communities, helped, Projects, team } from "../constant/numbers";

interface MetricProps {
    label?: string;
    value?: number;
    suffix?: string;
}

interface ImpactMetricsProps {
    metrics?: MetricProps[];
}

const defaultMetrics = [
    { label: "People Helped", value: helped, suffix: "+" },
    { label: "Projects Completed", value: Projects, suffix: "+" },
    { label: "Communities Served", value: Communities, suffix: "" },
    { label: "Team Members", value: team, suffix: "+" },
];

const Counter = ({ value = 0, suffix = "" }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                fontSize: "2.25rem", // text-4xl
                lineHeight: "2.5rem", // text-4xl
                fontWeight: "700", // font-bold
                color: "transparent",
                background: `linear-gradient(to right, ${maincolor}, ${seconderycolor})`, // bg-gradient-to-r from-blue-400 to-purple-600
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
            }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {value.toLocaleString()}
            </motion.span>
            {suffix}
        </motion.span>
    );
};

const MetricCard = ({ label = "", value = 0, suffix = "" }: MetricProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                width: 300,
                display: "flex",
                flexWrap: 'wrap',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem", // p-6
                backgroundColor: `${Accent}44`, // bg-white/5
                backdropFilter: "blur(20px)", // backdrop-blur-lg
                borderRadius: "1rem", // rounded-2xl
                border: "1px solid rgba(255, 255, 255, 0.5)", // border border-white/10
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)", // shadow-lg
            }}
        >
            <Counter value={value} suffix={suffix} />
            <p style={{ marginTop: "0.5rem", fontSize: "1.125rem", lineHeight: "1.75rem", color: "#4b5563", textAlign: "center" }}>
                {label}
            </p>
        </motion.div>
    );
};

const ImpactMetrics = ({ metrics = defaultMetrics }: ImpactMetricsProps) => {
    return (
        <section
            style={{
                width: "100vw",
                padding: "4rem 0", // py-16
                background: `linear-gradient(to right, '#fff', '#fff')`, // bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]
            }}
        >
            <div
                style={{
                    width: "100vw",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "1rem", // px-4 sm:px-6 lg:px-8
                    paddingRight: "1rem",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2
                        style={{
                            fontSize: "1.875rem", // text-3xl
                            lineHeight: "2.25rem", // text-3xl
                            fontWeight: "700", // font-bold
                            color: maincolor, // text-gray-900
                        }}
                    >
                        Our Impact
                    </h2>
                    <p
                        style={{
                            marginTop: "1rem", // mt-4
                            fontSize: "1.25rem", // text-xl
                            color: "#4b5563", // text-gray-600
                        }}
                    >
                        Making a difference in communities worldwide
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: 'wrap',
                        gap: "2rem", // gap-8
                        justifyContent: 'center'
                    }}
                >
                    {metrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            label={metric.label}
                            value={metric.value}
                            suffix={metric.suffix}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactMetrics;
