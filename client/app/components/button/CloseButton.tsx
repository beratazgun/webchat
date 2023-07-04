// 'use client'
import React from 'react'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'

interface CloseButtonProps {
	onClick?: () => void
	className?: string
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
	return (
		<button onClick={onClick} className={className}>
			<IoMdClose className="text-2xl" />
		</button>
	)
}

export default CloseButton
