import React, { JSX } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
    highlightWords?: string[];
    highlightClassName?: string;
    delay?: number;
    staggerDelay?: number;
    inline?: boolean;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
    children,
    className = "",
    as: Component = "h2",
    highlightWords = [],
    highlightClassName = "text-primary",
    delay = 0,
    staggerDelay = 0.1,
    inline = false,
}) => {
    // Create regex pattern from highlight words
    const escapedWords = highlightWords.map(word =>
        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    const highlightPattern = escapedWords.length > 0
        ? new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi')
        : null;

    // Process the text for highlighting
    const renderWords = () => {
        if (!highlightPattern || highlightWords.length === 0) {
            // No highlighting needed
            return children.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                    <WordSpan
                        word={word}
                        index={index}
                        delay={delay}
                        staggerDelay={staggerDelay}
                        isHighlighted={false}
                        highlightClassName={highlightClassName}
                    />
                    {index < children.split(" ").length - 1 && ' '}
                </React.Fragment>
            ));
        }

        // Split text by highlight words while preserving the matches
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = highlightPattern.exec(children)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                const text = children.substring(lastIndex, match.index);
                text.split(" ").forEach((word, i) => {
                    if (word.trim()) {
                        parts.push(
                            <WordSpan
                                key={`text-${lastIndex + i}`}
                                word={word}
                                index={parts.length}
                                delay={delay}
                                staggerDelay={staggerDelay}
                                isHighlighted={false}
                                highlightClassName={highlightClassName}
                            />
                        );
                    }
                });
            }

            // Add the highlighted match
            parts.push(
                <WordSpan
                    key={`highlight-${match.index}`}
                    word={match[0]}
                    index={parts.length}
                    delay={delay}
                    staggerDelay={staggerDelay}
                    isHighlighted={true}
                    highlightClassName={highlightClassName}
                />
            );

            lastIndex = highlightPattern.lastIndex;
        }

        // Add remaining text
        if (lastIndex < children.length) {
            const text = children.substring(lastIndex);
            text.split(" ").forEach((word, i) => {
                if (word.trim()) {
                    parts.push(
                        <WordSpan
                            key={`remaining-${lastIndex + i}`}
                            word={word}
                            index={parts.length}
                            delay={delay}
                            staggerDelay={staggerDelay}
                            isHighlighted={false}
                            highlightClassName={highlightClassName}
                        />
                    );
                }
            });
        }

        return parts;
    };

    return (
        <Component className={inline ? `inline-block ${className}` : className}>
            {renderWords()}
        </Component>
    );
};

// Helper component for word animation
const WordSpan: React.FC<{
    word: string;
    index: number;
    delay: number;
    staggerDelay: number;
    isHighlighted: boolean;
    highlightClassName: string;
}> = ({ word, index, delay, staggerDelay, isHighlighted, highlightClassName }) => (
    <motion.span
        className={isHighlighted ? highlightClassName : ""}
        style={{ display: "inline-block", marginRight: "0.25em" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
            delay: delay + index * staggerDelay,
            type: "spring",
            stiffness: 100,
        }}
        whileHover={{
            x: 4,
            transition: { type: "spring", stiffness: 400 },
        }}
    >
        {word}
    </motion.span>
);