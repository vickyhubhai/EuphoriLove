import ChatRoom from '@/app/_components/chat/page'
import React from 'react'

export default function Page({ params }) {
  const { roomId } = params;
  return (
    <ChatRoom roomId={roomId} />
  )
}