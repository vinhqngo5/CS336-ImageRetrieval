import { INIT_STATE } from "../../constants/INIT_STATE";
import { fetchSuggestedImages, getType, selectQueryImage } from "../actions";

export default function modalReducer(
	state = INIT_STATE.imageRetrievalState,
	action
) {
	switch (action.type) {
		case getType(selectQueryImage):
			return {
				...state,
				queryImage: action.payload,
			};
		case getType(fetchSuggestedImages.fetchSuggestedImagesRequest):
			return {
				...state,
				isLoadingSuggestedImages: true,
			};
		case getType(fetchSuggestedImages.fetchSuggestedImagesSuccess):
			return {
				...state,
				suggestedImages: action.payload.result,
				isLoadingSuggestedImages: false,
			};
		case getType(fetchSuggestedImages.fetchSuggestedImagesFailure):
			return {
				...state,
				isLoadingSuggestedImages: false,
			};
		default:
			return state;
	}
}
