import {
	BookmarksOutlined,
	CreateOutlined,
	FeedOutlined,
	HomeOutlined,
	ImageSearchOutlined,
	PersonOutlined,
} from "@mui/icons-material";

export const routes = [
	{
		text: "Write",
		startIcon: <CreateOutlined />,
		to: "/posts/create",
	},
	{
		text: "Profile",
		startIcon: <PersonOutlined />,
		to: "/profile",
	},
	{
		text: "My Feed",
		startIcon: <HomeOutlined />,
		to: "/",
	},
	{
		text: "Image Retrieval",
		startIcon: <ImageSearchOutlined />,
		to: "/image-retrieval"
	}
	// {
	// 	text: "My Posts",
	// 	startIcon: <FeedOutlined />,
	// 	to: "/posts",
	// },
	// {
	// 	text: "Saved",
	// 	startIcon: <BookmarksOutlined />,
	// 	to: "/saved",
	// },
];
