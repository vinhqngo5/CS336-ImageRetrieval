import { INIT_STATE } from "../../constants/INIT_STATE";
import { getType, selectQueryImage } from "../actions";

export default function modalReducer(
	state = INIT_STATE.imageRetrivalState,
	action
) {
	switch (action.type) {
		case getType(selectQueryImage):
			return {
				...state,
				queryImage: action.payload,
			};
		default:
			return state;
	}
}
