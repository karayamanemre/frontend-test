import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const emailRegex = /\S+@\S+\.\S+/;

export const LoginForm = () => {
	// const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [emailSubmitted, setEmailSubmitted] = useState(false);
	const { performLogin } = useContext(AuthContext);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleEmailSubmit = (event) => {
		event.preventDefault();
		if (!emailRegex.test(email)) {
			toast("Please enter a valid email address.");
			return;
		} else if (email.length < 15) {
			toast("Email must be at least 15 characters long.");
			return;
		}
		setEmailSubmitted(true);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!emailRegex.test(email)) {
			toast("Please enter a valid email address.");
			return;
		} else if (email.length < 15) {
			toast("Email must be at least 15 characters long.");
			return;
		}
		if (password.length < 8) {
			toast("Password must be at least 8 characters long.");
			return;
		}

		const response = await performLogin(email, password);
		if (response && response.error) {
			let userMessage = "An error occurred. Please try again.";
			if (Array.isArray(response.detail)) {
				const emailError = response.detail.find(
					(d) => d.field_name === "email"
				);
				if (emailError) {
					userMessage = emailError.error;
				}
			} else if (typeof response.detail === "string") {
				userMessage = response.detail;
			}
			toast(userMessage);
		} else {
			toast("Login successful!");
			// navigate("/home");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center gap-5 sm:w-[400px] w-[320px] px-6 sm:px-0'>
			<div className='flex items-start justify-between w-full gap-3'>
				<button
					type='button'
					className='flex items-center justify-center gap-[10px] w-full md:w-[192px] h-[48px] border-[1.2px] rounded-md text-sm border-[#D3D8DC]'>
					<FcGoogle size={18} />
					Google
				</button>
				<button
					type='button'
					className='flex items-center justify-center gap-[10px] w-full md:w-[192px] h-[48px] border-[1.2px] rounded-md text-sm border-[#D3D8DC]'>
					<FaGithub />
					GitHub
				</button>
			</div>

			<div className='flex items-center justify-center gap-2 sm:gap-0 sm:justify-between sm:w-[400px] w-[310px]'>
				<Separator className='w-28 sm:w-44' />
				<span className='text-xs text-[#BEC5CC]'>OR</span>
				<Separator className='w-28 sm:w-44' />
			</div>

			{!emailSubmitted ? (
				<form
					onSubmit={handleEmailSubmit}
					className='w-full md:w-[400px]'>
					<input
						type='email'
						value={email}
						onChange={handleEmailChange}
						placeholder='Work email'
						required
						className='w-full h-12 flex items-center border-[1.2px] rounded-md border-[#D3D8DC] px-3 placeholder:text-[#A1ABB5]'
					/>
					<button
						type='submit'
						className='bg-[#316FEA] rounded-lg text-white text-base w-full mt-8 h-12'>
						Login to Qencode
					</button>
				</form>
			) : (
				<form
					onSubmit={handleSubmit}
					className='w-full'>
					<input
						type='email'
						value={email}
						onChange={handleEmailChange}
						placeholder='Work email'
						required
						className='w-full h-12 flex items-center border-[1.2px] rounded-md border-[#D3D8DC] px-3 placeholder:text-[#A1ABB5]'
					/>

					<div className='relative'>
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={handlePasswordChange}
							placeholder='Password'
							required
							className='w-full h-12 flex items-center border-[1.2px] rounded-md border-[#D3D8DC] px-3 placeholder:text-[#A1ABB5] mt-4'
						/>
						<button
							type='button'
							onClick={togglePasswordVisibility}
							className='absolute top-4 right-4'>
							{showPassword ? (
								<IoEyeOffOutline size={18} />
							) : (
								<IoEyeOutline size={18} />
							)}
						</button>
					</div>
					<Link
						className='text-[#316FEA] text-sm mt-4 block text-right'
						to='/forgot-password'
						onClick={() => setEmailSubmitted(false)}>
						Forgot your password?
					</Link>

					<button
						type='submit'
						className='bg-[#316FEA] rounded-lg text-white text-base w-full mt-8 h-12'>
						{" "}
						Log in to Qencode
					</button>
				</form>
			)}
			<p className='text-sm'>
				Is your company new to Qencode?{" "}
				<a
					href='#'
					className='text-[#316FEA]'>
					Sign up
				</a>
			</p>
		</div>
	);
};
