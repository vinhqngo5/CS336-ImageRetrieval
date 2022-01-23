import { Box, styled } from "@mui/system";
import React, { useEffect } from "react";
import {
	Autocomplete,
	Button,
	ImageList,
	ImageListItem,
	TextField,
} from "@mui/material";
import { useState } from "react";

const availableQueries = [
	{ label: "All Souls Oxford" },
	{ label: "Balliol Oxford" },
	{ label: "Christ Church Oxford" },
	{ label: "Hertford Oxford" },
	{ label: "Jesus Oxford" },
	{ label: "Keble Oxford" },
	{ label: "Magdalen Oxford" },
	{ label: "New Oxford" },
	{ label: "Oriel Oxford" },
	{ label: "Trinity Oxford" },
	{ label: "Radcliffe Camera Oxford" },
	{ label: "Bodleian Oxford" },
	{ label: "Pitt Rivers Oxford" },
	{ label: "Ashmolean Oxford" },
	{ label: "Worcester Oxford" },
	{ label: "Oxford" },
];

export default function RightSideBar() {
	const [images, setImages] = useState([]);
	useEffect(() => {
		let temp = [];
		for (let i = 0; i < 30; i++) {
			temp.push(
				`https://picsum.photos/${Math.round(
					200 + Math.random() * 200
				)}/${Math.round(200 + Math.random() * 200)}`
			);
		}
		setImages(temp);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					marginTop: "10px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Autocomplete
					disablePortal
					sx={{
						width: "70%",
						color: "text.primary",
						backgroundColor: "backgroundSecondary.default",
						marginRight: "12px",
					}}
					id="combo-box-demo"
					options={availableQueries}
					renderInput={(params) => (
						<TextField {...params} label="Available queries" size="small" />
					)}
				/>
				<Button
					sx={{
						textTransform: "none",
					}}
					variant="outlined"
				>
					Search
				</Button>
			</Box>
			<MasonryImageList images={images} />
		</Box>
	);
}

const StytedImage = styled("img")(({ theme }) => ({
	"&:hover": {
		transform: "scale(1.1)",
		transition: "0.25s ease",
		cursor: "pointer",
	},
	width: "100%",
	borderRadius: "4px",
}));

function MasonryImageList({ images }) {
	return (
		<Box sx={{ overflowY: "scroll", height: "95vh", width: "100%" }}>
			<ImageList variant="masonry" cols={2} gap={12}>
				{images.map((image, index) => (
					<ImageListItem key={index}>
						<StytedImage
							src={`${image}`}
							alt="Oxford building"
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}
