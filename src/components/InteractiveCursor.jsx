import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const InteractiveCursor = () => {
    const cursorRef = useRef(null)
    const cursorDotRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [cursorText, setCursorText] = useState('')

    useEffect(() => {
        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0
        let dotX = 0
        let dotY = 0

        const animate = () => {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.1
            cursorY += (mouseY - cursorY) * 0.1

            // Faster dot movement
            dotX += (mouseX - dotX) * 0.3
            dotY += (mouseY - dotY) * 0.3

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`

            requestAnimationFrame(animate)
        }

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const handleMouseEnter = () => {
            cursor.style.opacity = '1'
            cursorDot.style.opacity = '1'
        }

        const handleMouseLeave = () => {
            cursor.style.opacity = '0'
            cursorDot.style.opacity = '0'
        }

        // Add hover effects for interactive elements
        const addHoverEffects = () => {
            const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-card, .nav-link')

            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    setIsHovering(true)
                    if (element.classList.contains('btn-primary')) {
                        setCursorText('Click!')
                    } else if (element.classList.contains('project-card')) {
                        setCursorText('View')
                    } else if (element.classList.contains('skill-card')) {
                        setCursorText('Skill')
                    } else {
                        setCursorText('')
                    }
                })

                element.addEventListener('mouseleave', () => {
                    setIsHovering(false)
                    setCursorText('')
                })
            })
        }

        // Initialize
        animate()
        addHoverEffects()

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="custom-cursor"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: [0, 1]
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: '2px solid white',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: 'white',
                    mixBlendMode: 'difference'
                }}
            >
                {cursorText}
            </motion.div>

            <motion.div
                ref={cursorDotRef}
                className="cursor-dot"
                animate={{
                    scale: isHovering ? 0.5 : 1
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'fixed',
                    top: -4,
                    left: -4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#06b6d4',
                    pointerEvents: 'none',
                    zIndex: 9998
                }}
            />
        </>
    )
}

export default InteractiveCursor
