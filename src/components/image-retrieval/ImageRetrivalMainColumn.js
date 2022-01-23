import { Container } from "@mui/material";
import CropImage from "./CropImage";
import React from "react";
import Heading from "../home/Heading";

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
		</Container>
	);
}
