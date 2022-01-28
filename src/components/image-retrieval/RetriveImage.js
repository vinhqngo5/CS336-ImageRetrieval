import { SearchOutlined, Send, SyncAlt } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Skeleton,
	TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { imageRetrievalState$ } from "../../redux/selectors";
import { getBase64FromUrl } from "../../utils/getBase64FromUrl";
import { STATIC_URL } from "../../config";
import {
	BlogCaption,
	BlogCaptionSmall,
	BlogH7,
	BlogSubtitle,
} from "../common/BlogTypography";

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
	// const [images, setImages] = useState([]);
	const dispatch = useDispatch();
	const imageRetrievalState = useSelector(imageRetrievalState$);
	const images = imageRetrievalState.relevantImages.relevant_image_name;
	const topKScore = imageRetrievalState.relevantImages.top_k_score;
	console.log(
		"🚀 ~ file: RetriveImage.js ~ line 46 ~ RetrieveImage ~ topKScore",
		topKScore
	);

	const loadImages = () => {
		getBase64FromUrl(imageRetrievalState.croppedQueryImage).then((base64) => {
			dispatch(
				actions.fetchRelevantImages.fetchRelevantImagesRequest({
					base64,
					top_k: 20,
				})
			);
		});
	};

	useEffect(() => {
		console.log(
			"🚀 ~ file: RetriveImage.js ~ line 52 ~ RetrieveImage ~ imageRetrievalState.relevantImages",
			imageRetrievalState.relevantImages
		);
	}, [imageRetrievalState]);

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
			<MasonryImageList images={images} topKScore={topKScore} />
		</Box>
	);
}

function MasonryImageList({ images, topKScore }) {
	let topKScoreArray = (topKScore || "").slice(1, -1).split(",");

	const imageRetrievalState = useSelector(imageRetrievalState$);
	return (
		<Box sx={{ width: "100%" }}>
			{images && !imageRetrievalState.isLoadingRelevantImages ? (
				<BlogCaptionSmall sx={{ marginTop: "12px" }}>
					Query 10 most relevant images (
					{imageRetrievalState.relevantImages.query_time}s)
				</BlogCaptionSmall>
			) : (
				<div />
			)}
			<ImageList variant="masonry" cols={2} gap={12}>
				{!imageRetrievalState.isLoadingRelevantImages
					? (images || []).map((image, index) => (
							<ImageListItem key={index}>
								{/* <StytedImage
									src={`${STATIC_URL}/${image}`}
									alt="Oxford building"
									loading="lazy"
								/> */}
								<BBoxImage
									imageLink={`${STATIC_URL}/${image}`}
									info={{
										x: 200,
										y: 220,
										w: 100,
										h: 50,
									}}
								></BBoxImage>
								<ImageListItemBar
									title={
										<BlogH7 sx={{ fontSize: "14px"}}>
											{image.split(".")[0].toUpperCase()}
										</BlogH7>
									}
									subtitle={
										<BlogCaption>Score: {topKScoreArray[index]}</BlogCaption>
									}
									position="below"
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
		// transform: "scale(1.05)",
		// transition: "0.25s ease",
		cursor: "pointer",
	},
	width: "100%",
	borderRadius: "4px",
}));

const StytedDiv = styled("img")(({ theme }) => ({
	"&:hover": {
		// transform: "scale(1.05)",
		// transition: "0.25s ease",
		cursor: "pointer",
	},
	width: "100%",
	borderRadius: "4px",
}));

const BBoxImage = ({ imageLink, info, style = {} }) => {
	const { x, y, w, h } = info;
	const { borderColor = "red", borderWidth = 100 } = style;
	const canvasRef = React.useRef(null);

	// useEffect(() => {
	// 	const canvas = canvasRef.current;
	// 	console.log(
	// 		"🚀 ~ file: RetriveImage.js ~ line 212 ~ useEffect ~ canvas",
	// 		canvas
	// 	);
	// 	const context = canvas.getContext("2d");
	// 	const img = new Image();
	// 	img.src = imageLink;
	// 	img.onload = () => {
	// 		context.drawImage(img, 0, 0, canvas.width, canvas.height);
	// 		context.beginPath();
	// 		context.strokeStyle = borderColor;
	// 		context.lineWidth = borderWidth;
	// 		context.rect(x, y, w, h);
	// 		context.stroke();
	// 	};
	// });
	return (
		<>
			<div
				style={{
					position: "absolute",
					border: "1px solid red",
					backgroundColor: "transparent",
					width: "100px",
					height: "100px",
					top: " 50px",
					left: " 50px",
				}}
			></div>
			<StytedImage src={imageLink} alt="Oxford building" loading="lazy" />
		</>
	);
};
