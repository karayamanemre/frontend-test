import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const NewPasswordForm = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { performSetNewPassword } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get("token");
	const secret = queryParams.get("secret");

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasNumber = /\d/;
		const hasUpper = /[A-Z]/;
		const hasLower = /[a-z]/;

		if (
			password.length < 8 ||
			!hasNumber.test(password) ||
			!hasUpper.test(password) ||
			!hasLower.test(password)
		) {
			toast.error(
				"Password is not strong enough. It should be at least 8 characters long, contain at least one numeric, one uppercase letter, and one lowercase letter."
			);
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		const response = await performSetNewPassword(
			token,
			secret,
			password,
			confirmPassword
		);
		if (response.success) {
			toast.success(
				"Password changed successfully. Redirecting to login page..."
			);
			setTimeout(() => navigate("/login"), 3000);
		} else {
			toast.error(response.message || "An error occurred. Please try again.");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md gap-4 px-4'>
			<form
				onSubmit={handleSubmit}
				className='w-full'>
				<div className='relative mb-4'>
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='New Password'
						required
						className='w-full h-12 border-[1.2px] border-[#D3D8DC] rounded-md px-3'
					/>
					<button
						type='button'
						onClick={toggleShowPassword}
						className='absolute inset-y-0 flex items-center text-sm leading-5 right-3'>
						{showPassword ? (
							<IoEyeOffOutline size={20} />
						) : (
							<IoEyeOutline size={20} />
						)}
					</button>
				</div>
				<div className='relative mb-4'>
					<input
						type={showConfirmPassword ? "text" : "password"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder='Confirm New Password'
						required
						className='w-full h-12 border-[1.2px] border-[#D3D8DC] rounded-md px-3'
					/>
					<button
						type='button'
						onClick={toggleShowConfirmPassword}
						className='absolute inset-y-0 flex items-center text-sm leading-5 right-3'>
						{showConfirmPassword ? (
							<IoEyeOffOutline size={20} />
						) : (
							<IoEyeOutline size={20} />
						)}
					</button>
				</div>
				<button
					type='submit'
					className='w-full bg-[#316FEA] text-white rounded-lg h-12 mt-4'>
					Set New Password
				</button>
			</form>
		</div>
	);
};
