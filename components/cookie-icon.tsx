import { motion } from 'framer-motion'

export const CookieIcon = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    className="fixed bottom-4 left-4 z-50 cursor-pointer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M21.8 12.7c-.1-.4-.5-.7-1-.7h-1.2c-.4-1.6-1.4-3-2.9-3.8-.1-.6-.4-1.2-.8-1.6C14.7 5.4 13 4.2 11 4.2c-.3 0-.5 0-.8.1-1.2.2-2.3.8-3.2 1.7-.8.8-1.4 1.9-1.6 3.1-.7.3-1.3.7-1.8 1.2-1.2 1.2-1.9 2.8-1.9 4.5 0 .5.1 1.1.2 1.6.4 1.4 1.2 2.6 2.4 3.4 1.2.8 2.6 1.2 4.1 1.2h9.7c1.1 0 2.2-.3 3.1-.9 1-.6 1.8-1.5 2.3-2.5.5-1.1.6-2.3.3-3.5zM11 5.2c1.6 0 3 .9 3.7 2.2-.5-.1-1.1-.2-1.7-.2-1.6 0-3.1.5-4.3 1.4-.4-.5-.6-1.1-.6-1.8 0-.9.4-1.7 1-2.3.6-.6 1.3-.9 2.1-1.1.2-.1.5-.2.8-.2z"
        fill="#FFA500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
    </svg>
  </motion.div>
)
