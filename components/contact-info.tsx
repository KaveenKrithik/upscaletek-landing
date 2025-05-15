"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <h2 className="text-3xl font-bold mb-12">Contact Information</h2>

      <div className="space-y-10">
        <motion.div variants={itemVariants} className="flex items-start">
         
         
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start">
          <div className="bg-purple-900 bg-opacity-30 p-3 rounded-full mr-4">
            <Phone className="text-purple-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-300">+91 733 880 3631</p>
            
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start">
          <div className="bg-purple-900 bg-opacity-30 p-3 rounded-full mr-4">
            <Mail className="text-purple-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-300">upscaletek@gmail.com</p>
          
          </div>
        </motion.div>

      
      </div>
    </motion.div>
  )
}
