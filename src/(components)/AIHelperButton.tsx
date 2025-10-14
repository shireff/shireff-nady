import Image from "next/image";
import { motion } from "framer-motion";

export default function AIHelperButton({ onClick }: { onClick: () => void }) {

  return (
    <motion.button
      className="chat bottom-24 right-6 z-[60] rounded-full shadow-none transition-all duration-300"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label="Open AI Assistant"
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <Image
          src="/bot-avatar.jpg"
          alt="AI Assistant"
          fill
          sizes="64px"
          priority
          className="object-cover rounded-full"
        />
      </div>
    </motion.button>
  );
}
