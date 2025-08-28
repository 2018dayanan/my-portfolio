import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CreativeLoader = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    const loadingSteps = [
        { text: "Initializing", color: "#667eea" },
        { text: "Loading Assets", color: "#8b5cf6" },
        { text: "Building Portfolio", color: "#06b6d4" },
        { text: "Ready!", color: "#10b981" }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < loadingSteps.length - 1) {
                    return prev + 1
                } else {
                    clearInterval(timer)
                    setTimeout(() => {
                        setIsComplete(true)
                        setTimeout(onComplete, 1000)
                    }, 500)
                    return prev
                }
            })
        }, 800)

        return () => clearInterval(timer)
    }, [onComplete])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.5 }
        }
    }

    const shapeVariants = {
        hidden: {
            scale: 0,
            rotate: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            rotate: 360,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    if (isComplete) {
        return (
            <motion.div
                className="loader-complete"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    textAlign: 'center'
                }}
            >
                <motion.div
                    className="success-checkmark"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: 'white',
                        fontSize: '2rem'
                    }}
                >
                    ✓
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        color: '#10b981',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}
                >
                    Portfolio Loaded!
                </motion.h2>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="creative-loader"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                color: 'white'
            }}
        >
            {/* Animated shapes */}
            <div className="loader-shapes" style={{ position: 'relative', marginBottom: '3rem' }}>
                <motion.div
                    className="shape shape-1"
                    variants={shapeVariants}
                    style={{
                        position: 'absolute',
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        top: -30,
                        left: -30
                    }}
                />
                <motion.div
                    className="shape shape-2"
                    variants={shapeVariants}
                    style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                        borderRadius: '50%',
                        top: 20,
                        right: -20
                    }}
                />
                <motion.div
                    className="shape shape-3"
                    variants={shapeVariants}
                    style={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                        borderRadius: '50%',
                        bottom: -25,
                        left: 10
                    }}
                />

                {/* Central logo */}
                <motion.div
                    className="central-logo"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        width: 80,
                        height: 80,
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    D
                </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
                className="loading-text"
                variants={textVariants}
                style={{ textAlign: 'center' }}
            >
                <motion.h2
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: loadingSteps[currentStep].color
                    }}
                >
                    {loadingSteps[currentStep].text}
                </motion.h2>

                {/* Progress bar */}
                <motion.div
                    className="progress-bar"
                    style={{
                        width: 300,
                        height: 4,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        margin: '0 auto'
                    }}
                >
                    <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${loadingSteps[currentStep].color} 0%, ${loadingSteps[(currentStep + 1) % loadingSteps.length].color} 100%)`,
                            borderRadius: 2
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="floating-particle"
                    initial={{
                        opacity: 0,
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        position: 'absolute',
                        width: 4,
                        height: 4,
                        background: loadingSteps[i % loadingSteps.length].color,
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }}
                />
            ))}
        </motion.div>
    )
}

export default CreativeLoader
