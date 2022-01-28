import { useTheme } from "@emotion/react";
import { Button, Paper, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import withLogin from "../../hoc/withLogin";
import { BlogCaption, BlogH6 } from "../common/BlogTypography";

export const LoginButton = withLogin(Button);

export default function Heading() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("lg"));
	if (!matches) return null;
	return (
		<Paper
			variant="outlined"
			elevation={0}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "10px 20px",
				margin: "10px 0px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "divider.main",
			}}
		>
			<Box>
				<BlogH6>Community Feed</BlogH6>
				<BlogCaption>Recent articles from the community</BlogCaption>
			</Box>

			<Box>
				<LoginButton
					component={Button}
					sx={{
						textTransform: "none",
					}}
					variant="outlined"
					content="Login"
				/>
				<LoginButton
					component={Button}
					variant="contained"
					sx={{
						marginLeft: "10px",
						textTransform: "none",
					}}
					content="Create an account"
				/>
			</Box>
		</Paper>
	);
}
