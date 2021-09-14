import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import withLogin from "../../hoc/withLogin";

export const LoginButton = withLogin(Button);

export default function Heading() {
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
				<Typography
					variant="h6"
					component="div"
					sx={{
						color: "text.primary",
						fontSize: "25px",
						fontWeight: "700",
					}}
				>
					Community Feed
				</Typography>
				<Typography
					variant="caption"
					component="div"
					sx={{
						color: "text.secondary",
						fontSize: "14px",
					}}
				>
					Recent articles from the community
				</Typography>
			</Box>
			<Box>
				<LoginButton
					Component={Button}
					sx={{
						textTransform: "none",
					}}
					variant="outlined"
					content="Login"
				/>
				<LoginButton
					Component={Button}
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
