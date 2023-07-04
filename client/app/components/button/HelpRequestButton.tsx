'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'

const createHelpRequest = async () => {
	const res = await fetch('http://localhost:3005/help/create-help-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	return await res.json()
}

const HelpRequestButton = () => {
	const router = useRouter()
	const [isAccepted, setIsAccepted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = async () => {
		setIsLoading(true)
		const response = await createHelpRequest()

		if (response.isSuccess) {
			router.push(`http://localhost:3000/chat/${response.chatId}`)
			setIsAccepted(true)
		}
	}

	return (
		<div className="pt-4 ">
			<button
				className="text-lg font-bold bg-green-600 px-4 py-2 mt-24 rounded-lg w-82 min-w-82 max-w-82"
				id="create-help-request"
				onClick={() => handleClick()}>
				{isAccepted && isLoading ? (
					<div className="flex flex-row justify-center items-center gap-2 w-82 min-w-82 max-w-82">
						<ImSpinner9 className="animate-spin" />
						<span>Redirecting</span>
					</div>
				) : (
					'Connect to customer delegate'
				)}
			</button>
		</div>
	)
}

export default HelpRequestButton
