
// 'use client'
// import { Button } from '@/components/ui/button'
// import { IconArrowRight } from '@tabler/icons-react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import React from 'react'
// import axios from 'axios'

// export type AiDoctorAgent = {
//   id: number,
//   name: string,
//   specialty: string,
//   description: string,
//   image: string,
//   agentPrompt: string,
//   doctorVoiceId?: string
// }

// type Props = {
//   AiDoctorAgent: AiDoctorAgent
// }

// export default function AiDoctorAgentCard({ AiDoctorAgent }: Props) {
//   const router = useRouter()


//   const handleStartConsultation = async () => {
//     try {
//       const res = await axios.post('/api/chat-session', {
//         notes: 'New consultation', 
//         selectedDoctor: AiDoctorAgent,
//         note: 'New consultation',
//         report: {},
//         status: 'pending',
//         createdOn: new Date().toISOString(),
//       });

//       // redirect to session or dashboard
//       router.push(`/dashboard/medical-voice/${res.data.sessionId}`);
//     } catch (err) {
//       console.error('Failed to start consultation:', err);
//       alert('Unable to start consultation. Try again.');
//     }
//   };


//   return (
//     <div className="w-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
//       <Image
//         src={AiDoctorAgent?.image}
//         alt={AiDoctorAgent?.name}
//         width={200}
//         height={200}
//         className="w-full h-[250px] object-cover border-b border-gray-700"
//       />
//       <div className="p-4 text-white">
//         <div className="flex items-center justify-between mb-1">
//           <h2 className="text-base font-semibold">{AiDoctorAgent.name}</h2>
//           <span className="text-xs bg-purple-700 px-2 py-0.5 rounded-full">
//             {AiDoctorAgent.specialty}
//           </span>
//         </div>
//         <p className="text-sm text-gray-300 line-clamp-2">{AiDoctorAgent.description}</p>
//         <div className="flex justify-center mt-4">
//           <Button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
//             onClick={handleStartConsultation}
//           >
//             Start Consultation
//             <IconArrowRight className="ml-1 w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export type AiDoctorAgent = {
  id: number,
  name: string,
  specialty: string,
  description: string,
  image: string,
  agentPrompt: string,
  doctorVoiceId?: string
}

type Props = {
  AiDoctorAgent: AiDoctorAgent
}

export default function AiDoctorAgentCard({ AiDoctorAgent }: Props) {
  const router = useRouter()

  const handleStartConsultation = async () => {
    try {
      const res = await axios.post('/api/chat-session', {
        notes: 'New consultation',
        selectedDoctor: AiDoctorAgent,
        note: 'New consultation',
        report: {},
        status: 'pending',
        createdOn: new Date().toISOString(),
      })

      router.push(`/dashboard/medical-voice/${res.data.sessionId}`)
    } catch (err) {
      console.error('Failed to start consultation:', err)
      alert('Unable to start consultation. Try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-[450px] flex flex-col rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
    >
      <div className="relative w-full h-[300px]">
        <Image
          src={AiDoctorAgent.image}
          alt={AiDoctorAgent.name}

          fill
          className="object-cover border-b border-gray-700"
        />
      </div>
      <div className="p-5 text-white flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">{AiDoctorAgent.name}</h2>
            <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-0.5 rounded-full shadow-md">
              {AiDoctorAgent.specialty}
            </span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-2">{AiDoctorAgent.description}</p>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm shadow-md transition-all"
            onClick={handleStartConsultation}
          >
            Start Consultation
            <IconArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
