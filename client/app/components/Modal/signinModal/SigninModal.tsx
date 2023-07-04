import dynamic from 'next/dynamic'
import { useMutation } from '@tanstack/react-query'
import registerOptions from './registerOptions'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '../../button/Button'
import Heading from '../../Heading'
import Input from '../../Inputs/Input'
import CloseButton from '../../button/CloseButton'
import { useModal } from '../../../hooks/useModal'
import toast from 'react-hot-toast'

const Modal = dynamic(() => import('../Modal'))

async function signin(data: FieldValues) {
	const res = await fetch(`http://localhost:3005/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(data),
	})

	return res.json()
}

const SigninModal = () => {
	const router = useRouter()
	const { closeModal } = useModal()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			signinUsername: '',
			signinPassword: 'password',
		},
		mode: 'all',
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await signin({
				username: getValues('signinUsername'),
				password: getValues('signinPassword'),
			})

			if (res.isSuccess) {
				toast.success(res.message, {
					duration: 1000,
				})

				setTimeout(() => {
					closeModal('signin-modal')
				}, 110)

				if (res.result.role === 'customer') {
					router.push('/customer')
				} else if (res.result.role === 'delegate') {
					router.push('/delegate')
				}
			} else if (res.isSuccess === false) {
				toast.error(res.message)
			}
		},
	})

	const closeButton = (
		<CloseButton
			className="p-1 border-0 hover:opacity-70 hover:bg-slate-100 rounded-full transition absolute left-9"
			onClick={() => closeModal('signin-modal')}
		/>
	)

	const body = (
		<form
			className="flex flex-col gap-6 w-full px-6"
			onSubmit={handleSubmit((data) => data)}>
			<Heading title="Welcome 🎉" subtitle="Sign in to your account!" />
			<Input
				id="signinUsername"
				type="text"
				label="Username"
				register={register}
				registerOptions={registerOptions.signinUsername}
				errors={errors}
			/>
			<Input
				id="signinPassword"
				type="password"
				label="Password"
				register={register}
				registerOptions={registerOptions.signinPassword}
				errors={errors}
			/>
			<Button label="Sign İn" isLoading={isLoading} onClick={() => mutate()} />
		</form>
	)

	return (
		<Modal
			title="Sign İn"
			body={body}
			closeButton={closeButton}
			modalId="signin-modal"
		/>
	)
}

export default SigninModal
