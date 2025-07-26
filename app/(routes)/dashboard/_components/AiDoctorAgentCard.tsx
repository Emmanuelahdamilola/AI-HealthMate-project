
'use client'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'

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
      });

      // redirect to session or dashboard
      router.push(`/dashboard/medical-voice/${res.data.sessionId}`);
    } catch (err) {
      console.error('Failed to start consultation:', err);
      alert('Unable to start consultation. Try again.');
    }
  };


  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
      <Image
        src={AiDoctorAgent?.image}
        alt={AiDoctorAgent?.name}
        width={200}
        height={200}
        className="w-full h-[250px] object-cover border-b border-gray-700"
      />
      <div className="p-4 text-white">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold">{AiDoctorAgent.name}</h2>
          <span className="text-xs bg-purple-700 px-2 py-0.5 rounded-full">
            {AiDoctorAgent.specialty}
          </span>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{AiDoctorAgent.description}</p>
        <div className="flex justify-center mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
            onClick={handleStartConsultation}
          >
            Start Consultation
            <IconArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

