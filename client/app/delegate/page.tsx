import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import RenderHelpRequests from '../components/RenderHelpRequests'
import RefreshButton from '../components/RefreshButton'

async function getHelpRequests() {
	const res = await fetch('http://localhost:3005/help/get-all-help-requests', {
		method: 'GET',
		credentials: 'include',
		next: { revalidate: 0 },
	})

	return res.json()
}

const page = async () => {
	const response = await getHelpRequests()

	return (
		<DashboardLayout>
			<div className="flex flex-col justify-center items-center gap-4 ">
				<div className="flex flex-row justify-center items-center relative w-96">
					<h1 className="rounded-t-xl px-4 py-2 border-t-[1px] border-slate-600 ">
						Help Requests
					</h1>
					<div className="absolute flex flex-row justify-center items-center rounded-full right-2 h-10 w-10 bg-[#1f2937] hover:scale-110 duration-300">
						<RefreshButton />
					</div>
				</div>
				<div className="h-[30rem] w-96 rounded-lg border-[1px] border-slate-700">
					<RenderHelpRequests result={response.result} />
				</div>
			</div>
		</DashboardLayout>
	)
}

export default page
