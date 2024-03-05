import { createContext, useState } from "react";
import * as authService from "../utils/authService";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		accessToken: null,
		refreshToken: null,
		expiresAt: null,
	});

	const login = (tokens) => {
		setAuthState({
			isAuthenticated: true,
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			expiresAt: tokens.expires_in,
		});
	};

	const performLogin = async (email, password) => {
		try {
			const { success, data, error } = await authService.login(email, password);
			if (success) {
				login({
					accessToken: data.access_token,
					refreshToken: data.refresh_token,
					expiresAt: data.token_expire,
				});
			} else {
				throw new Error(error.detail || "An unknown error occurred.");
			}
		} catch (error) {
			console.error("Login error:", error.message);
			return error.message;
		}
	};

	const performResetPassword = async (email) => {
		try {
			const response = await authService.resetPassword(email);
			if (response.error === 0) {
				return {
					success: true,
					message:
						"Please check your email to complete the password reset process.",
				};
			} else if (response.detail === "Invalid user") {
				return {
					success: false,
					message: "User doesn't exist. Enter a valid user info.",
				};
			} else {
				return {
					success: false,
					message: "An error occurred. Please try again.",
				};
			}
		} catch (error) {
			console.error("Reset password error:", error);
			return {
				success: false,
				message: "An error occurred. Please try again.",
			};
		}
	};

	const performSetNewPassword = async (
		token,
		secret,
		password,
		passwordConfirm
	) => {
		try {
			const response = await authService.setNewPassword(
				token,
				secret,
				password,
				passwordConfirm
			);
			if (response.error === 0) {
				return { success: true, message: "Password reset successfully." };
			} else {
				return { success: false, message: "Failed to reset password." };
			}
		} catch (error) {
			console.error("Set new password error:", error);
			return {
				success: false,
				message: "An error occurred. Please try again.",
			};
		}
	};

	const authContextValue = {
		authState,
		performLogin,
		login,
		performResetPassword,
		performSetNewPassword,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
