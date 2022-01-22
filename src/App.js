import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import CreatePost from "./pages/posts/CreatePost";
import Posts from "./pages/posts/Posts";
import getDesignTokens from "./utils/getDesigntokens";
import { useSelector } from "react-redux";
import { themeModeState$ } from "./redux/selectors";
import { makeStyles } from "@mui/styles";
import Profile from "./pages/profile/Profile";
import UserPost from "./pages/profile/UserPost";
import NotFound from "./pages/notfound/NotFound";

const useStyles = makeStyles((theme) => {
	return {
		app: {
			backgroundColor: theme.palette.background.default,
			minHeight: "100vh",
			"::webkitScrollbar": {
				width: 0 /* Remove scrollbar space */,
				background: "transparent" /* Optional: just make scrollbar invisible */,
			},
			overflow: "hidden"
		},
	};
});

export function App() {
	const classes = useStyles();

	return (
		<Box className={classes.app}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Home></Home>
					</Route>
					<Route exact path="/posts/create">
						<CreatePost />
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
					<Route exact path="/posts">
						<Posts />
					</Route>
					<Route path="/:authorSlug/:postSlug">
						<UserPost />
					</Route>
					<Route path="/:path">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</Box>
	);
}

export default function ToggleColorMode() {
	const mode = useSelector(themeModeState$);

	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	);
}
