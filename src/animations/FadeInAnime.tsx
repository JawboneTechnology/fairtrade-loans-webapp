// components/animations/FadeIn.tsx
import React from 'react';
import { motion, easeOut } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
}

const FadeInAnime: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    duration = 0.5,
    className = '',
    direction = 'up',
    distance = 20,
}) => {
    const getDirection = () => {
        switch (direction) {
            case 'up':
                return { y: distance };
            case 'down':
                return { y: -distance };
            case 'left':
                return { x: distance };
            case 'right':
                return { x: -distance };
            case 'none':
                return {};
            default:
                return { y: distance };
        }
    };

    const fadeInVariants = {
        hidden: {
            opacity: 0,
            ...getDirection(),
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: easeOut,
            },
        },
    };

    return (
        <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeInAnime;