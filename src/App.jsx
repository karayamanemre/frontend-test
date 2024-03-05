import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "./components/ui/sonner";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { NewPasswordPage } from "./pages/NewPasswordPage";

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/login'
						element={<LoginPage />}
					/>
					<Route
						path='/forgot-password'
						element={<ForgotPasswordPage />}
					/>
					<Route
						path='/new-password'
						element={<NewPasswordPage />}
					/>
				</Routes>
			</BrowserRouter>
			<Toaster position='bottom-center' />
		</AuthProvider>
	);
};

export default App;
