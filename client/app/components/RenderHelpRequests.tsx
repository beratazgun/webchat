'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'

interface RenderHelpRequestsProps {
	result: {
		username: string
		chatId: string
	}[]
}

const RenderHelpRequests: React.FC<RenderHelpRequestsProps> = ({ result }) => {
	const router = useRouter()
	const [isAccepted, setIsAccepted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const acceptHelpRequest = async (chatId: string) => {
		setIsLoading(true)
		const res = await fetch(
			`http://localhost:3005/help/accept-help-request/${chatId}`,
			{
				method: 'POST',
				credentials: 'include',
			}
		)

		const response = await res.json()

		if (response.isSuccess) {
			setIsAccepted(true)
			router.push(`http://localhost:3000/chat/${chatId}`)
		}
	}

	const renderHelpRequests = result.map(
		(el: { username: string; chatId: string }) => {
			return (
				<div
					className="flex flex-row justify-between px-6 py-2 items-center w-full"
					key={uuidv4()}>
					<p className="text-xl">{el.username}</p>
					<button
						className="bg-green-500 text-white px-4 py-1 rounded-lg hover:-translate-y-1 duration-300"
						onClick={() => acceptHelpRequest(el.chatId)}>
						{isAccepted && isLoading ? (
							<div className="flex flex-row justify-center items-center gap-2">
								<ImSpinner9 className="animate-spin" />
								<span>Redirecting</span>
							</div>
						) : (
							'Accept'
						)}
					</button>
				</div>
			)
		}
	)

	return (
		<div className="flex flex-col gap-4 justify-between w-full">
			{renderHelpRequests}
		</div>
	)
}

export default RenderHelpRequests
