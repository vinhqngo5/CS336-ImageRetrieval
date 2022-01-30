import axios from "axios";
import { store } from "../index";
import { fetchedPosts, user } from "../constants/cloneDatabase";
import { URL } from "../config";

export const fetchSuggestedImages = (category) => {
	console.log(
		"🚀 ~ file: index.js ~ line 7 ~ fetchSuggestedImages ~ category",
		category
	);
	const body = new FormData();
	body.append("category", category);
	return axios.post(`${URL}/get-suggest-query`, body);
};

export const fetchRelevantImages = ({
	base64: image,
	top_k = 10,
	resize_ratio = 1,
	return_bboxes,
	lsh,
}) => {
	// let body = {
	// 	query: image,
	// 	top_k: top_k,
	// };
	const body = new FormData();
	body.append("query", image);
	body.append("top_k", top_k);
	body.append("resize_ratio", resize_ratio);
	body.append("return_bboxes", return_bboxes);
	body.append("lsh", lsh);
	return axios.post(`${URL}/query`, body);
};

export const fetchPosts = () => {
	if (store.getState().blogState.fetchedPosts == null) return fetchedPosts;
	else return store.getState().blogState.fetchedPosts;
};

export const fetchUserInfo = () => user;

export const createPost = (payload) => [
	payload,
	...store.getState().blogState.fetchedPosts,
];

export const fetchPostMarkdown = (payload) => {
	return findPostBySlug(payload.postSlug);
};

// tạm thời
const findPostBySlug = (postSlug) => {
	const posts = store.getState().blogState.fetchedPosts || fetchedPosts;
	for (var post of posts) {
		if (post.postSlug === postSlug && !post.postMarkdownReal)
			return axios.get(post.postMarkdown);
		else if (post.postSlug === postSlug) return post.postMarkdownReal;
	}
	return null;
};

export const findPostInfoBySlug = (postSlug) => {
	console.log(
		"🚀 ~ file: index.js ~ line 33 ~ findPostInfoBySlug ~ postSlug",
		postSlug
	);
	const posts = store.getState().blogState.fetchedPosts || fetchedPosts;
	console.log(
		"🚀 ~ file: index.js ~ line 34 ~ findPostInfoBySlug ~ posts",
		posts
	);
	for (var post of posts) {
		if (post.postSlug === postSlug && !post.postMarkdownReal) {
			console.log("go to this 1 ");
			return post;
		} else if (post.postSlug === postSlug) {
			console.log("go to this 2 ");
			return post;
		}
	}
	console.log("go to this 3 ");
	return {};
};
