import { color, motion } from 'framer-motion';
import { Accent, fontColor } from '../constant/color';

const Card = (props) => {
    // Card container animation
    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            y: -10,
            transition: { duration: 0.3 }
        }
    };



    const styles = {
        cardContainer: {
            backgroundColor: props.backgroundColor || `${Accent}55` || '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '350px',
            minWidth: '300px',
            margin: '20px',
            color: props.color || fontColor || 'black'
        },
        imageContainer: {
            width: '100%',
            height: '200px',
            overflow: 'hidden',
            position: 'relative',
        },
        content: {
            padding: '20px',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '10px',
            color: props.titlecolor || fontColor || 'black'

        },
        description: {
            fontSize: '1rem',
            lineHeight: '1.5',
            color: fontColor || 'black'

        },
    };

    return (
        <motion.div
            style={styles.cardContainer}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >

            {props.Imagesrc ? <img style={{ width: '100%' }} src={props.Imagesrc}></img> : <></>}


            <div style={styles.content}>
                <h3 style={styles.title}>{props.title}</h3>
                <p style={styles.description}>{props.description}</p>
            </div>
        </motion.div>
    );
};

export default Card;