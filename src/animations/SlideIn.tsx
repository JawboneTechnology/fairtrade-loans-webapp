// components/animations/SlideIn.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideInProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    width?: string;
    height?: string;
    position?: 'absolute' | 'fixed';
    className?: string;
    withBackdrop?: boolean;
    backdropClassName?: string;
}

const SlideIn: React.FC<SlideInProps> = ({
    children,
    isOpen,
    onClose,
    direction = 'right',
    width = 'w-96',
    height = 'h-full',
    position = 'fixed',
    className = '',
    withBackdrop = true,
    backdropClassName = '',
}) => {
    const getSlideVariants = () => {
        const distance = '100%';

        switch (direction) {
            case 'left':
                return {
                    hidden: { x: `-${distance}`, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                    exit: { x: `-${distance}`, opacity: 0 },
                };
            case 'right':
                return {
                    hidden: { x: distance, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                    exit: { x: distance, opacity: 0 },
                };
            case 'top':
                return {
                    hidden: { y: `-${distance}`, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: `-${distance}`, opacity: 0 },
                };
            case 'bottom':
                return {
                    hidden: { y: distance, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: distance, opacity: 0 },
                };
            default:
                return {
                    hidden: { x: distance, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                    exit: { x: distance, opacity: 0 },
                };
        }
    };

    const getPositionClasses = () => {
        switch (direction) {
            case 'left':
                return 'left-0 top-0';
            case 'right':
                return 'right-0 top-0';
            case 'top':
                return 'top-0 left-0 right-0';
            case 'bottom':
                return 'bottom-0 left-0 right-0';
            default:
                return 'right-0 top-0';
        }
    };

    const slideVariants = getSlideVariants();
    const positionClasses = getPositionClasses();

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const panelTransition = {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
    };

    const backdropTransition = {
        duration: 0.2,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    {withBackdrop && (
                        <motion.div
                            key="backdrop"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={backdropTransition}
                            className={`fixed inset-0 bg-black/20 opacity-50 z-10 ${backdropClassName}`}
                            onClick={onClose}
                        />
                    )}

                    {/* Slide Panel */}
                    <motion.div
                        key="slide-panel"
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={panelTransition}
                        className={`
              ${position} ${positionClasses} ${width} ${height} 
              z-50 overflow-hidden ${className}
            `}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SlideIn;