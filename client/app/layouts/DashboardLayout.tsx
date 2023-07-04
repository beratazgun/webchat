import React from 'react'
import getSession from '../lib/getSession'
import { useUsers } from '../hooks/useUsers'
import User from '../components/User'

interface DashboardLayoutProps {
	children: React.ReactNode
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

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
	children,
}) => {
	const sesID = getSession()
	let currentUser: {
		username: string
		role: string
	} = {
		username: '',
		role: '',
	}

	if (sesID) {
		const response = await getCurrentUser(sesID.value)
		currentUser = response.result
	}

	return (
		<div className="pt-6 ">
			<div className="gap-4 mx-auto bg-[#111827] rounded-xl h-[40rem] w-[60rem]">
				<User username={currentUser.username} role={currentUser.role} />
				{children}
			</div>
		</div>
	)
}

export default DashboardLayout
