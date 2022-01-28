import { Container, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import LeftSideBar from "../leftSideBar/LeftSideBar";
import RightSideBar from "../rightSideBar/RightSideBar";
import SmallHeader from "../header/SmallHeader";
import { useTheme } from "@emotion/react";
export default function MainColumnContainer(props) {
	const ContainerRightSideBar = props.RightSideBar || RightSideBar;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("md"));
	return (
		<Container maxWidth="xl">
			<Grid
				container
				spacing={0}
				justifyContent="center"
				columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 11 }}
			>
				<Box
					component={Grid}
					item
					md={2}
					lg={2}
					xl={1.5}
					display={{
						xs: "none",
						lg: "block",
					}}
					sx={{
						height: "100vh",
					}}
				>
					<LeftSideBar />
				</Box>
				<Box component={Grid} item sm={12} md={8} lg={7} xl={6}>
					<SmallHeader />
					<Box
						sx={{
							overflow: "auto",
							backgroundColor: "background.default",
							maxHeight: matches ? "100vh" : "90vh",
							borderRadius: "4px",
						}}
					>
						{props.children}
					</Box>
				</Box>
				<Box
					component={Grid}
					item
					md={4}
					lg={3}
					xl={2}
					display={{
						md: "block",
						sm: "none",
					}}
					sx={{
						height: "100vh",
						paddingLeft: "20px",
					}}
				>
					<ContainerRightSideBar />
				</Box>
			</Grid>
		</Container>
	);
}
