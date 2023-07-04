'use client'
import React, { useState, useEffect, useCallback } from 'react'
import TerminateButton from '@/app/components/button/TerminateButton'
import { socket } from '@/app/services/socket'
import { capitalize } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'

interface PageClientProps {
	chatId: string
	username: string
	chatMessages: Message[]
}

interface Message {
	username: string
	message: string
	date: Date
}

const PageClient: React.FC<PageClientProps> = ({
	chatId,
	username,
	chatMessages,
}) => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<Message[]>(chatMessages)
	const [isClicked, setIsClicked] = useState(false)

	const cleanup = useCallback(() => {
		socket.off('receive-message')
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	// update messages
	const updateMessages = useCallback((newMessage: Message) => {
		setMessages((prevMessages) => {
			if (prevMessages.some((message) => message.date === newMessage.date)) {
				return prevMessages
			}
			return [...prevMessages, newMessage]
		})
	}, [])

	useEffect(() => {
		socket.on(
			'receive-message',
			(data: { username: string; message: string; date: Date }) => {
				const newMessage = {
					username: data.username,
					message: data.message,
					date: new Date(Date.now()),
				}
				updateMessages(newMessage)
			}
		)

		return cleanup
	}, [cleanup])

	// Send message to server
	const sendMessage = () => {
		if (message.trim() === '') return

		socket.emit('send-message', { message, chatId, date: new Date(Date.now()) }) // Send message to server
		setMessage('')
		setIsClicked(!isClicked)
	}

	// Join chat when user enters the chat
	useEffect(() => {
		socket.emit('join-chat', { username, chatId }) // Join chat
	}, [])

	// window.addEventListener('beforeunload', (e) => {
	// 	e.preventDefault()
	// 	socket.emit('leave-chat', { username, chatId })
	// })

	const renderedMessages = messages.map((message, index) => {
		return (
			<div
				className={`
			flex flex-col max-w-[32rem] px-4
			${message.username === username ? 'items-end ' : ''}
			${
				message.username === 'Chat Bot' && message.username === username
					? 'items-end '
					: ''
			}
			`}
				key={index}>
				<div className="flex flex-row items-center gap-2  px-4 py-2 rounded-2xl w-fit max-w-[26rem] bg-[#1f2937]">
					<div className={`flex flex-col justify-start items-start gap-1 `}>
						<div className="flex flex-row items-center justify-between gap-2 w-full">
							<p className="text-sm font-semibold text-orange-600">
								{capitalize(message.username)}
							</p>
							<p className="text-xs text-gray-400">
								{new Date(message.date.toString())
									.getHours()
									.toString()
									.padStart(2, '0') +
									':' +
									new Date(message.date.toString())
										.getMinutes()
										.toString()
										.padStart(2, '0')}
							</p>
						</div>
						<p className="text-sm text-white">{message.message}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className="pt-10">
			<div className="flex flex-col justify-between items-center gap-4 h-[40rem] w-[32rem] bg-[#111827] mx-auto rounded-lg border-[1px] border-slate-700">
				<div className="pt-2">
					<TerminateButton chatId={chatId} username={username} />
				</div>
				<div className="h-[39rem] hover:overflow-y-auto overflow-x-hidden">
					<div className="flex flex-col gap-2 w-[32rem]">
						{renderedMessages}
					</div>
				</div>
				<div className="flex flex-row items-center w-full px-4 gap-4 pb-2">
					<input
						onChange={handleChange}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault()
								sendMessage()
							}
						}}
						value={message}
						type="text"
						className="w-full bg-[#1f2937] outline-none px-4 py-2 rounded-lg"
						placeholder="Type a message..."
					/>
					<button
						className="hover:bg-green-600 px-4 py-2 rounded-lg duration-300"
						onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default PageClient
