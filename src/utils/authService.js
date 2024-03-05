const API_BASE_URL = "https://auth-qa.qencode.com/v1/auth";

export const login = async (email, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		return { success: true, data };
	} catch (error) {
		return { success: false, error };
	}
};

export const refreshToken = async (refreshToken) => {
	const response = await fetch(`${API_BASE_URL}/refresh-token`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refresh_token: refreshToken }),
	});
	return await response.json();
};

export const resetPassword = async (email) => {
	const redirectUrl = `${window.location.origin}/new-password`;
	const response = await fetch(`${API_BASE_URL}/password-reset`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, redirect_url: redirectUrl }),
	});
	return await response.json();
};

export const setNewPassword = async (
	token,
	secret,
	password,
	passwordConfirm
) => {
	const response = await fetch(`${API_BASE_URL}/password-set`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token,
			secret,
			password,
			password_confirm: passwordConfirm,
		}),
	});
	return await response.json();
};
