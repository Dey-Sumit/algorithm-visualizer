export const variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2, duration: 0.6,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'easeInOut'
        }
    }
}