'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/app/hooks/useUsers'

interface UserProps {
	username: string
	role: string
}

async function signout() {
	const res = await fetch('http://localhost:3005/signout', {
		method: 'POST',
		credentials: 'include',
	})

	return res.json()
}

const User: React.FC<UserProps> = ({ username, role }) => {
	const router = useRouter()
	const { setData } = useUsers()

	const handleSignout = async () => {
		const response = await signout()

		if (response.isSuccess) {
			router.push('/')
		}
	}

	useEffect(() => {
		setData(username, role)
	}, [])

	return (
		<div className="flex flex-row justify-between items-center px-6 py-4">
			<div>
				<p>{username}</p>
			</div>
			<div>
				<button
					className=" ring-2 rounded-lg px-2 py-1 ring-orange-600"
					onClick={() => handleSignout()}>
					Sign Out
				</button>
			</div>
		</div>
	)
}

export default User
