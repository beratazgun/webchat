'use client'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	id: string
	type: string
	label: string
	register: UseFormRegister<FieldValues>
	registerOptions?: any
	errors?: any
}

const Input: React.FC<InputProps> = ({
	type,
	label,
	register,
	id,
	registerOptions,
	errors,
}) => {
	return (
		<div className="w-full relative">
			<input
				id={id}
				type={type}
				{...register(id, registerOptions)}
				className={`peer w-full py-2 px-4 pt-6 font-light bg-[#1f2937] border-2 duration-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-md
					`}
			/>
			<label
				className={`absolute text-md text-white duration-200  transform -translate-y-3 top-4 z-10 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  left-4 `}>
				{label}
			</label>
			{errors[id] && (
				<div className="relative z-100 text-[1rem] right-2 bottom-0 text-md pl-2 pt-1 text-red-500">
					{errors[id] && errors[id].message}
				</div>
			)}
		</div>
	)
}

export default Input
