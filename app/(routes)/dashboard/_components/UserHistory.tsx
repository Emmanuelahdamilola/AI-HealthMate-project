
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AddNewSessionDialog from './AddNewSessionDialog';
import axios from 'axios';
import { SessionParams } from '../medical-voice/[sessionId]/page';

type UserHistoryProps = {
  onHistoryLoaded?: (history: SessionParams[]) => void;
};

export default function UserHistory({ onHistoryLoaded }: UserHistoryProps) {
  const [history, setHistory] = useState<SessionParams[]>([]);

  useEffect(() => {
    handleHistoryList();
  }, []);

  const handleHistoryList = async () => {
    const result = await axios.get('/api/chat-session?sessionId=all');
    setHistory(result.data);
    if (onHistoryLoaded) onHistoryLoaded(result.data); 
  };

    return (
      <div className='flex flex-col items-center justify-center h-96'>
        <Image src={'/assistant-doctors.png'} width={200} height={200} className='w-50 h-50' alt="No History"/>
        <h2 className='text-lg font-semibold pt-3'>No Consultation History</h2>
        <p className='text-gray-500'>You haven't consulted with any doctor yet.</p>
        <AddNewSessionDialog/>
        <p className='text-gray-500 mt-2'>
          You can also <a href="/contact" className='text-blue-500 hover:underline'>contact support</a> if you have any questions.
        </p>
      </div>
    );

}
