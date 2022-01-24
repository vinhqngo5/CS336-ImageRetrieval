import { Container } from "@mui/material";
import CropImage from "./CropImage";
import React from "react";
import Heading from "../home/Heading";
import RetriveImage from "./RetriveImage";
import { Box } from "@mui/system";
export default function ImageRetrivalMainColumn() {
	return (
		<Container
			style={{
				width: "100%",
				height: "100%",
				overflowY: "scroll",
				overflowX: "hidden",
				padding: "0px",
			}}
		>
			<Heading />
			<CropImage />
			<Box sx={{ marginTop: "40px" }}>
				<RetriveImage />
			</Box>
		</Container>
	);
}
