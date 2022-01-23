import { Box } from "@mui/system";
import React from "react";

import { Button } from "@mui/material";
import { EmojiEmotions } from "@mui/icons-material";
import ProfileItems from "../../common/ProfileItems";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { BlogCaption, BlogH6 } from "../../common/BlogTypography";

export default function LeftSideBar() {
	return (
		<Box
			sx={{
				padding: "10px 20px 10px 10px",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<Box>
				<Box
					sx={{
						marginTop: "10px",
						height: "50px",
						display: "flex",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<EmojiEmotions
						sx={{
							fontWeight: "700",
							fontSize: "25px",
							color: "primary.main",
						}}
					/>
					<BlogH6>CS336</BlogH6>
				</Box>

				{routes.map((route, index) => (
					<Link
						style={{
							textDecoration: "none",
						}}
						key={index}
						to={route.to}
					>
						{index === 0 ? (
							<Button
								sx={{
									height: "40px",
									marginBottom: "15px",
								}}
								variant="contained"
								startIcon={route.startIcon}
								fullWidth
							>
								{route.text}
							</Button>
						) : (
							<Button
								sx={{
									height: "35px",
									justifyContent: "flex-start",
									textTransform: "none",
									color: "text.primary",
									"&:hover": {
										backgroundColor: "backgroundSecondary.default",
									},
								}}
								startIcon={route.startIcon}
								variant="text"
								fullWidth
							>
								<BlogCaption> {route.text}</BlogCaption>
							</Button>
						)}
					</Link>
				))}
			</Box>
			<ProfileItems
				component={Box}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{
					display: "flex",
					flexDirection: "column",
					// width: "100%",
					alignItems: "center",
					justifyContent: "center",
					color: "text.primary",
					borderRadius: 1,
					p: 3,
				}}
			/>
		</Box>
	);
}
