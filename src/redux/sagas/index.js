import { takeLatest, call, put, delay } from "redux-saga/effects";
import * as api from "../../apis";
import * as actions from "../actions";

function* fetchPostsSaga(action) {
	try {
		yield delay(1000);
		const fetchedPost = yield call(api.fetchPosts);

		yield put(actions.fetchPosts.fetchPostsSuccess(fetchedPost));
	} catch (err) {
		yield put(actions.fetchPosts.fetchPostsFailure(err));
	}
}
function* createPostSaga(action) {
	try {
		// create api ~ post
		yield put(actions.createPost.createPostSuccess(action.payload));
	} catch (err) {
		yield put(actions.createPost.createPostFailure(err));
	}
}

function* fetchPostMarkdownSaga(action) {
	try {
		const fetchPostMarkdown = yield call(api.fetchPostMarkdown, action.payload);
		let test = {};
		if (fetchPostMarkdown?.data) {
			test = {
				...api.findPostInfoBySlug(action.payload.postSlug),
				postMarkdownReal: fetchPostMarkdown.data,
			};
			// yield put(
			// 	actions.fetchPostMarkdown.fetchPostMarkdownSuccess(
			// 		fetchPostMarkdown.data
			// 	)
			// );
		} else {
			test = {
				...api.findPostInfoBySlug(action.payload.postSlug),
				postMarkdownReal: fetchPostMarkdown,
			};
			// yield put(
			// 	actions.fetchPostMarkdown.fetchPostMarkdownSuccess(fetchPostMarkdown)
			// );
		}
		yield put(actions.fetchPostMarkdown.fetchPostMarkdownSuccess(test));
	} catch (err) {
		console.log(
			"🚀 ~ file: index.js ~ line 52 ~ function*fetchPostMarkdownSaga ~ err",
			err
		);
		yield put(actions.fetchPostMarkdown.fetchPostMarkdownFailure(err));
	}
}

function* fetchUserInfoSaga() {
	try {
		const userInfo = yield call(api.fetchUserInfo);

		yield put(actions.fetchUserInfo.fetchUserInfoSuccess(userInfo.data));
	} catch (err) {
		yield put(actions.fetchUserInfo.fetchUserInfoFailure(err));
	}
}

function* fetchSuggestedImagesSaga(action) {
	try {
		const suggestedImages = yield call(
			api.fetchSuggestedImages,
			action.payload
		);
		yield put(
			actions.fetchSuggestedImages.fetchSuggestedImagesSuccess(
				suggestedImages.data
			)
		);
	} catch (err) {
		console.error(err);
		yield put(actions.fetchSuggestedImages.fetchSuggestedImagesFailure(err));
	}
}

function* fetchRelevantImagesSaga(action) {
	try {
		const relevantImages = yield call(api.fetchRelevantImages, action.payload);
		yield put(
			actions.fetchRelevantImages.fetchRelevantImagesSuccess(
				relevantImages.data
			)
		);
	} catch (err) {
		console.error(err);
		yield put(actions.fetchRelevantImages.fetchRelevantImagesFailure(err));
	}
}

function* mySaga() {
	yield takeLatest(
		actions.fetchUserInfo.fetchUserInfoRequest,
		fetchUserInfoSaga
	);
	yield takeLatest(actions.fetchPosts.fetchPostsRequest, fetchPostsSaga);
	yield takeLatest(
		actions.fetchPostMarkdown.fetchPostMarkdownRequest,
		fetchPostMarkdownSaga
	);
	yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
	yield takeLatest(
		actions.fetchSuggestedImages.fetchSuggestedImagesRequest,
		fetchSuggestedImagesSaga
	);
	yield takeLatest(
		actions.fetchRelevantImages.fetchRelevantImagesRequest,
		fetchRelevantImagesSaga
	);
	// yield takeLatest(actions.switchDarkMode, fetchPostMarkdownSaga);
}
export default mySaga;
