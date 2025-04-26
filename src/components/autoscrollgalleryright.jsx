import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const AutoScrollGalleryRight = (props) => {
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);
    const duration = props.duration || 20; // Seconds for full scroll
    const duplicatedImages = [...props.images, ...props.images];

    useEffect(() => {
        if (!isHovered) {
            controls.start({
                x: ['-10%', '90%'],
                transition: {
                    duration: duration,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop'
                }
            });
        } else {
            controls.stop();
        }
    }, [controls, isHovered]);

    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            margin: '40px 0',
            padding: '20px 0'
        }}>

            <div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 2,
                    background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)'
                }} />

            <motion.div
                animate={controls}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    width: 'max-content'
                }}
            >
                {duplicatedImages.map((image, index) => (
                    <motion.div
                        key={index}
                        style={{
                            position: 'relative',
                            width: '300px',
                            height: '200px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            flexShrink: 0
                        }}
                        whileHover={{
                            scale: 1.2,
                            transition: { stiffness: 300 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src={image}
                            alt={`Gallery item ${index % props.images.length}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(40%)',
                                transition: 'filter 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(40%)'}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AutoScrollGalleryRight;