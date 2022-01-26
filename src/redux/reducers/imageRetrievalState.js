import { INIT_STATE } from "../../constants/INIT_STATE";
import {
	fetchRelevantImages,
	fetchSuggestedImages,
	getType,
	selectCroppedQueryImage,
	selectQueryImage,
} from "../actions";

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
		case getType(selectCroppedQueryImage):
			return {
				...state,
				croppedQueryImage: action.payload,
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
		case getType(fetchRelevantImages.fetchRelevantImagesRequest):
			return {
				...state,
				isLoadingRelevantImages: true,
			};
		case getType(fetchRelevantImages.fetchRelevantImagesSuccess):
			console.log(
				"🚀 ~ file: imageRetrievalState.js ~ line 44 ~ action.payload",
				action.payload
			);
			return {
				...state,
				relevantImages: action.payload.result,
				isLoadingRelevantImages: false,
			};
		case getType(fetchRelevantImages.fetchRelevantImagesFailure):
			return {
				...state,
				isLoadingRelevantImages: false,
			};
		default:
			return state;
	}
}
