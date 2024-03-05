import { LoginForm } from "../components/LoginForm";
import logo from "../assets/qencode.svg";

export const LoginPage = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<img
				src={logo}
				alt='Qencode Logo'
				className='mb-16'
			/>
			<h2 className='mb-10 text-2xl font-semibold md:text-3xl'>
				Log in to your account
			</h2>
			<LoginForm />
		</div>
	);
};
