import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "./components/ui/sonner";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { NewPasswordPage } from "./pages/NewPasswordPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomePage } from "./pages/Home";

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='*'
						element={<PrivateRoute />}
					/>
					<Route
						path='/'
						element={
							<PrivateRoute>
								<HomePage />
							</PrivateRoute>
						}
					/>
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
