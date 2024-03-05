import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
	const { authState } = useAuth();

	if (!authState.isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
