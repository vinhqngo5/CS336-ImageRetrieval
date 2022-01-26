import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
	return reduxAction().type;
};

export const switchLightMode = createAction("SWITCH_LIGHT_MODE");
export const switchDarkMode = createAction("SWITCH_DARK_MODE");
export const selectQueryImage = createAction("SELECT_QUERY_IMAGE");
export const selectCroppedQueryImage = createAction(
	"SELECT_CROPPED_QUERY_IMAGE"
);

export const fetchPosts = createActions({
	fetchPostsRequest: undefined,
	fetchPostsSuccess: (payload) => payload,
	fetchPostsFailure: (err) => err,
});

export const fetchPostMarkdown = createActions({
	fetchPostMarkdownRequest: undefined,
	fetchPostMarkdownSuccess: (payload) => payload,
	fetchPostMarkdownFailure: (err) => err,
});

export const fetchUserInfo = createActions({
	fetchUserInfoRequest: undefined,
	fetchUserInfoSuccess: (payload) => payload,
	fetchUserInfoFailure: (err) => err,
});

export const createPost = createActions({
	createPostRequest: (payload) => payload,
	createPostSuccess: (payload) => payload,
	createPostFailure: (err) => err,
});

export const fetchSuggestedImages = createActions({
	fetchSuggestedImagesRequest: (payload) => payload,
	fetchSuggestedImagesSuccess: (payload) => payload,
	fetchSuggestedImagesFailure: (err) => err,
});

export const fetchRelevantImages = createActions({
	fetchRelevantImagesRequest: (payload) => payload,
	fetchRelevantImagesSuccess: (payload) => payload,
	fetchRelevantImagesFailure: (err) => err,
});
