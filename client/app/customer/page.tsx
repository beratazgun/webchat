import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import HelpRequestButton from '../components/button/HelpRequestButton'

const page = () => {
	return (
		<DashboardLayout>
			<div className="flex flex-col justify-center items-center gap-4 ">
				<HelpRequestButton />
			</div>
		</DashboardLayout>
	)
}

export default page
