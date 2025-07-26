import { AiDoctorList } from '@/shared/doctorList'
import React from 'react'
import AiDoctorAgentCard from './AiDoctorAgentCard'

export default function AIDoctors() {
  return (
    <div className="mt-5 px-4">
      <p className="text-center text-lg italic mb-5">Select a doctor to get started</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {AiDoctorList.map((doctor, index) => (
          <AiDoctorAgentCard key={index} AiDoctorAgent={doctor} />
        ))}
      </div>
    </div>
  )
}
