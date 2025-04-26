import React from 'react';
import { motion } from 'framer-motion'

const MyButton = (props) => {

    {/*package you should install 
        framer-motion
         
    */}

    {/* prop and what they do
        important ones( click  scale hoverColor animationduration  backgrouncolor textcolor  text )
        click: you can put a function to when the button is clicked
        hoverColor :color of the btn when mouse is hovering
        scale: the scale at which the btn scale up when hoverd over(default is none or 1)
        animationduration:animation duration in seconds
        backgrouncolor:background color of the btn( the default value is white)
        textcolor: the color of the text of the btn( the default value is black)
        text:the text in the btn

        additional(onlyImage radius btnheight btnstyle, hover_Effect)
        hover_Effect:animation effect of when hovering over the btn
        onlyImage:if you want to use image instead of text in the btn add the src in this props
        radius:radius of the button(the default value is 10)
        btnheight:the height of the btn( the default value is 40)
        btnstyle:style to custumize the btn


        example 
        <MyButton click={() => console.log('header btn clicked')} animationduration={50} hover_Effect={{ scale: 1.1, backgroundColor: 'pink' }} backgrouncolor={'#73FA5A'} text='Hello' radius={5} textcolor='white' />
        
        */}
    return (<motion.button
        onClick={props.click}

        whileHover={{ ...props.hover_Effect, scale: props.scale || 1, backgroundColor: props.hoverColor }
        }
        transition={{ type: 'spring', damping: props.animationduration }}
        style={{ ...props.btnstyle, backgroundColor: props.backgrouncolor || 'white', alignItems: 'center', borderRadius: props.radius || 10, height: props.btnheight || 40, color: props.textcolor || 'black', borderWidth: 0 }}>
        {props.onlyImage ? <img style={{ height: '130%', justifySelf: 'center', position: 'relative' }} src={props.onlyImage} /> : props.text || 'Click Me'}




    </motion.button>
    );
};

export default MyButton