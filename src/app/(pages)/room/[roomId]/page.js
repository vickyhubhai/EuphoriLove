import ChatRoom from '@/app/_components/chat/page'
import React from 'react'

export default async function Page({ params }) {
  const roomId = await params.roomId;
  return (
    <ChatRoom roomId={roomId} />
  )
}