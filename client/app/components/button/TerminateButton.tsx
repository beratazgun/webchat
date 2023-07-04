'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { socket } from '@/app/services/socket'

const terminateHelpRequest = async (chatId: string) => {
	const res = await fetch(
		`http://localhost:3005/help/terminate-help-request/${chatId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)

	return await res.json()
}

interface TerminateButtonProps {
	chatId: string
	username: string
}

const TerminateButton: React.FC<TerminateButtonProps> = ({
	chatId,
	username,
}) => {
	const router = useRouter()
	const [isClicked, setIsClicked] = useState(false)

	const handleTerminateHelpRequest = async () => {
		const response = await terminateHelpRequest(chatId)

		if (response.isSuccess) {
			if (response.role === 'customer') {
				setIsClicked(true)
				router.push('/customer')
			}
			if (response.role === 'delegate') {
				setIsClicked(true)
				router.push('/delegate')
			}
		}
	}

	useEffect(() => {
		if (isClicked) {
			socket.emit('leave-chat', { username, chatId })
		}
	}, [isClicked])

	return (
		<button
			className="bg-red-600 px-3 py-1 rounded-lg"
			onClick={() => handleTerminateHelpRequest()}>
			Leave chat
		</button>
	)
}

export default TerminateButton
