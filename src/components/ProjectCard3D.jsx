import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const ProjectCard3D = ({ project, index }) => {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])
    const scale = useTransform(x, [-100, 100], [0.95, 1.05])

    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        x.set(e.clientX - centerX)
        y.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    return (
        <motion.div
            ref={cardRef}
            className="project-card-3d"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            whileHover={{ z: 20 }}
        >
            <motion.div
                className="card-content"
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: 'preserve-3d',
                }}
                transition={{ duration: 0.1 }}
            >
                <div className="project-image-3d">
                    <img src={project.image} alt={project.title} />
                    <motion.div
                        className="project-overlay-3d"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.button
                            className="project-link-3d"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ExternalLink />
                        </motion.button>
                    </motion.div>

                    {/* 3D depth layers */}
                    <motion.div
                        className="depth-layer depth-1"
                        style={{
                            transform: 'translateZ(20px)',
                        }}
                        animate={{
                            opacity: isHovered ? 0.3 : 0,
                        }}
                    />
                    <motion.div
                        className="depth-layer depth-2"
                        style={{
                            transform: 'translateZ(40px)',
                        }}
                        animate={{
                            opacity: isHovered ? 0.2 : 0,
                        }}
                    />
                </div>

                <motion.div
                    className="project-content-3d"
                    style={{
                        transform: 'translateZ(30px)',
                    }}
                >
                    <motion.h3
                        animate={{
                            color: isHovered ? '#667eea' : '#1f2937',
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.title}
                    </motion.h3>
                    <p>{project.description}</p>
                    <div className="project-tech-3d">
                        {project.tech.map((tech) => (
                            <motion.span
                                key={tech}
                                className="tech-tag-3d"
                                whileHover={{ scale: 1.1, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                    className="card-glow"
                    animate={{
                        opacity: isHovered ? 0.6 : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.div>
    )
}

export default ProjectCard3D
