import { motion } from "framer-motion";

const gradientVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function AnimatedGradientBackground() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={gradientVariants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg, #ff6b6b, #f7b7a3, #ff6b6b)",
        backgroundSize: "400% 400%",
        zIndex: 0,
      }}
    />
  );
}
