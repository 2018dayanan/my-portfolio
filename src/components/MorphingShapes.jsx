import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MorphingShapes = () => {
    const canvasRef = useRef(null)
    const shapesRef = useRef([])
    const timeRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationId

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create morphing shapes
        const createShapes = () => {
            shapesRef.current = [
                {
                    type: 'circle',
                    x: canvas.width * 0.2,
                    y: canvas.height * 0.3,
                    size: 80,
                    rotation: 0,
                    morphProgress: 0,
                    targetType: 'triangle'
                },
                {
                    type: 'square',
                    x: canvas.width * 0.8,
                    y: canvas.height * 0.7,
                    size: 100,
                    rotation: 0,
                    morphProgress: 0,
                    targetType: 'circle'
                },
                {
                    type: 'triangle',
                    x: canvas.width * 0.5,
                    y: canvas.height * 0.8,
                    size: 90,
                    rotation: 0,
                    morphProgress: 0,
                    targetType: 'square'
                }
            ]
        }

        // Draw shape based on type and morph progress
        const drawShape = (shape) => {
            ctx.save()
            ctx.translate(shape.x, shape.y)
            ctx.rotate(shape.rotation)

            const morphFactor = Math.sin(shape.morphProgress) * 0.5 + 0.5

            if (shape.type === 'circle' || (shape.targetType === 'circle' && morphFactor > 0.5)) {
                const radius = shape.size * (0.8 + morphFactor * 0.4)
                ctx.beginPath()
                ctx.arc(0, 0, radius, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${200 + morphFactor * 60}, 70%, 60%, 0.3)`
                ctx.fill()
                ctx.strokeStyle = `hsla(${200 + morphFactor * 60}, 70%, 60%, 0.8)`
                ctx.lineWidth = 3
                ctx.stroke()
            } else if (shape.type === 'square' || (shape.targetType === 'square' && morphFactor > 0.5)) {
                const size = shape.size * (0.8 + morphFactor * 0.4)
                ctx.beginPath()
                ctx.rect(-size / 2, -size / 2, size, size)
                ctx.fillStyle = `hsla(${280 + morphFactor * 60}, 70%, 60%, 0.3)`
                ctx.fill()
                ctx.strokeStyle = `hsla(${280 + morphFactor * 60}, 70%, 60%, 0.8)`
                ctx.lineWidth = 3
                ctx.stroke()
            } else if (shape.type === 'triangle' || (shape.targetType === 'triangle' && morphFactor > 0.5)) {
                const size = shape.size * (0.8 + morphFactor * 0.4)
                ctx.beginPath()
                ctx.moveTo(0, -size / 2)
                ctx.lineTo(-size / 2, size / 2)
                ctx.lineTo(size / 2, size / 2)
                ctx.closePath()
                ctx.fillStyle = `hsla(${120 + morphFactor * 60}, 70%, 60%, 0.3)`
                ctx.fill()
                ctx.strokeStyle = `hsla(${120 + morphFactor * 60}, 70%, 60%, 0.8)`
                ctx.lineWidth = 3
                ctx.stroke()
            }

            ctx.restore()
        }

        // Animate shapes
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            shapesRef.current.forEach((shape, index) => {
                // Update morphing progress
                shape.morphProgress += 0.02

                // Change target type periodically
                if (shape.morphProgress > Math.PI * 2) {
                    shape.morphProgress = 0
                    const types = ['circle', 'square', 'triangle']
                    const currentIndex = types.indexOf(shape.targetType)
                    shape.targetType = types[(currentIndex + 1) % types.length]
                }

                // Update rotation
                shape.rotation += 0.005

                // Add floating motion
                shape.y += Math.sin(timeRef.current * 0.001 + index) * 0.5
                shape.x += Math.cos(timeRef.current * 0.001 + index) * 0.3

                // Keep shapes in bounds
                if (shape.x < 0) shape.x = canvas.width
                if (shape.x > canvas.width) shape.x = 0
                if (shape.y < 0) shape.y = canvas.height
                if (shape.y > canvas.height) shape.y = 0

                drawShape(shape)
            })

            timeRef.current += 16
            animationId = requestAnimationFrame(animate)
        }

        createShapes()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            className="morphing-shapes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    )
}

export default MorphingShapes
