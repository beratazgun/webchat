'use client'
import { useModal } from './hooks/useModal'

export default function Home() {
	const { openModal } = useModal()

	return (
		<div className="flex flex-row justify-center items-center gap-4 mx-auto mt-10  bg-[#111827] rounded-xl h-[40rem] w-[60rem]">
			<button
				className=" text-xl bg-orange-600 px-4 py-2 rounded-lg text-white "
				onClick={() => openModal('signin-modal')}>
				Sign in
			</button>
			<button
				className=" text-xl bg-orange-600 px-4 py-2 rounded-lg text-white "
				onClick={() => openModal('signup-modal')}>
				Sign up
			</button>
		</div>
	)
}
