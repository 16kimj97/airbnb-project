import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function CreateForm() {

	const user = useSelector((state) => {
		return state.session.user;
	});

	return user ? <NavLink to={`/spots/new`}>Create New Spot</NavLink> : null;
}

export default CreateForm;
