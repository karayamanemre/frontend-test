import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const emailRegex = /\S+@\S+\.\S+/;

export const ForgotPasswordForm = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const { performResetPassword } = useContext(AuthContext);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSendClick = async () => {
		if (!email) {
			toast("Email cannot be empty.");
			return;
		}
		if (!emailRegex.test(email)) {
			toast("Please enter a valid email address.");
			return;
		}
		const { success, message } = await performResetPassword(email);
		toast(message);
		// setTimeout(() => {
		// 	navigate("/new-password");
		// }, 3000);
		if (success) {
			// navigate("/new-password");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center gap-5 sm:w-[400px] w-[320px] px-6 sm:px-0'>
			<input
				type='email'
				value={email}
				onChange={handleEmailChange}
				placeholder='Enter your email'
				className='w-full h-12 border-[1.2px] border-[#D3D8DC] rounded-md px-3 placeholder:text-[#A1ABB5]'
				required
			/>
			<div className='flex flex-col w-full gap-2'>
				<button
					onClick={handleSendClick}
					className='flex-grow bg-[#316FEA] text-white rounded-lg h-12'>
					Send
				</button>
				<button
					onClick={() => navigate("/login")}
					className='flex-grow border-[1.2px] border-[#D3D8DC] text-black rounded-lg h-12'>
					Cancel
				</button>
			</div>
		</div>
	);
};
