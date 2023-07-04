import React from 'react'
import PageClient from './PageClients'
import getSession from '@/app/lib/getSession'

interface pageProps {
	params: {
		chatId: string
	}
}

async function getCurrentUser(session: string) {
	const res = await fetch('http://localhost:3005/get-user', {
		method: 'GET',
		credentials: 'include',
		headers: {
			cookie: `sesID=${session}`,
		},
	})

	return res.json()
}

async function getChatMessages(chatId: string) {
	const res = await fetch(
		`http://localhost:3005/chat/get-chat-messages/${chatId}`,
		{
			method: 'GET',
			credentials: 'include',
		}
	)

	return res.json()
}

const page: React.FC<pageProps> = async ({ params: { chatId } }) => {
	const sesID = getSession()
	const currentUser = await getCurrentUser(sesID?.value as string)
	const chatMessages = await getChatMessages(chatId)

	return (
		<PageClient
			chatId={chatId}
			username={currentUser.result.username}
			chatMessages={chatMessages.result}
		/>
	)
}

export default page
