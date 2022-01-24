import { SearchOutlined, Send, SyncAlt } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	ImageList,
	ImageListItem,
	Skeleton,
	TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getBase64FromUrl } from "../../utils/getBase64FromUrl";

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

export default function RetrieveImage() {
	const [images, setImages] = useState([]);

	const loadImages = () => {
		setImages([]);
		let temp = [];
		for (let i = 0; i < 30; i++) {
			temp.push(
				getBase64FromUrl(
					`https://picsum.photos/${Math.round(
						400 + Math.random() * 200
					)}/${Math.round(200 + Math.random() * 200)}`
				)
			);
		}
		Promise.all(temp).then((images) => {
			setImages(images);
		});
	};

	useEffect(() => {
		loadImages();
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
				<Box
					sx={{
						width: "70%",
						display: "flex",
					}}
				>
					<Autocomplete
						disablePortal
						sx={{
							color: "text.primary",
							backgroundColor: "backgroundSecondary.default",
							marginRight: "12px",
							flexGrow: "1",
						}}
						id="combo-box-demo"
						options={availableQueries}
						renderInput={(params) => (
							<TextField {...params} label="setting 1" size="small" />
						)}
					/>
					<Autocomplete
						disablePortal
						sx={{
							color: "text.primary",
							backgroundColor: "backgroundSecondary.default",
							marginRight: "12px",
							flexGrow: "1",
						}}
						id="combo-box-demo"
						options={availableQueries}
						renderInput={(params) => (
							<TextField {...params} label="setting 2" size="small" />
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
					}}
				>
					<Button
						sx={{
							textTransform: "none",
							marginRight: "12px",
						}}
						variant="outlined"
						onClick={loadImages}
						endIcon={<SearchOutlined />}
					>
						Search
					</Button>
					<Button
						sx={{
							textTransform: "none",
						}}
						variant="outlined"
						color="success"
						onClick={loadImages}
						endIcon={<SyncAlt />}
						disableElevation
					>
						Update
					</Button>
				</Box>
			</Box>
			<MasonryImageList images={images} />
		</Box>
	);
}

function MasonryImageList({ images }) {
	return (
		<Box sx={{ width: "100%" }}>
			<ImageList variant="masonry" cols={2} gap={12}>
				{images.length > 0
					? images.map((image, index) => (
							<ImageListItem key={index}>
								<StytedImage
									src={`${image}`}
									alt="Oxford building"
									loading="lazy"
								/>
							</ImageListItem>
					  ))
					: Array.from(new Array(30)).map((el, index) => (
							<Skeleton
								key={index}
								variant="rectangular"
								sx={{
									width: "100%",
									margin: index === 0 ? "0 auto 12px" : "12px auto",
									height: `${100 + Math.random() * 200}px`,
									borderRadius: "4px",
								}}
							/>
					  ))}
			</ImageList>
		</Box>
	);
}

const StytedImage = styled("img")(({ theme }) => ({
	"&:hover": {
		transform: "scale(1.05)",
		transition: "0.25s ease",
		cursor: "pointer",
	},
	width: "100%",
	borderRadius: "4px",
}));
