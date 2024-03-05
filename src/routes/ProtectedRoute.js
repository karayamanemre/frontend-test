import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
	const { authState } = useContext(AuthContext);

	if (!authState.isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
