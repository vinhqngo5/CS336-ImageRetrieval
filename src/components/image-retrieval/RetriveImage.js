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

const settings = [{ label: "Query with LSH" }, { label: "Query without LSH" }];

export default function RetrieveImage() {
	// const [images, setImages] = useState([]);
	const dispatch = useDispatch();
	const imageRetrievalState = useSelector(imageRetrievalState$);
	const images = imageRetrievalState.relevantImages.relevant_image_name;
	const topKScore = imageRetrievalState.relevantImages.top_k_score;
	const BBoxes = imageRetrievalState.relevantImages.bboxes;

	const loadImages = ({ return_bboxes }) => {
		getBase64FromUrl(imageRetrievalState.croppedQueryImage).then((base64) => {
			dispatch(
				actions.fetchRelevantImages.fetchRelevantImagesRequest({
					base64,
					top_k: 20,
					return_bboxes: return_bboxes,
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
					// marginTop: "10px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Box
					sx={{
						width: "50%",
						display: "flex",
					}}
				>
					<Autocomplete
						disablePortal
						sx={{
							color: "text.primary",
							backgroundColor: "backgroundSecondary.default",
							flexGrow: "1",
						}}
						id="combo-box-demo"
						options={settings}
						renderInput={(params) => (
							<TextField {...params} label="settings" size="small" />
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
						onClick={() => loadImages({ return_bboxes: false })}
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
						onClick={() => loadImages({ return_bboxes: true })}
						endIcon={<SyncAlt />}
						disableElevation
					>
						Search with bboxes
					</Button>
				</Box>
			</Box>
			<MasonryImageList images={images} topKScore={topKScore} BBoxes={BBoxes} />
		</Box>
	);
}

function MasonryImageList({ images, topKScore, BBoxes }) {
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
							<ImageListItem key={index} sx={{}}>
								<BBoxImage
									imageLink={`${STATIC_URL}/${image}`}
									BBox={BBoxes[index + 1]}
								></BBoxImage>
								<ImageListItemBar
									title={
										<BlogH7 sx={{ fontSize: "14px" }}>
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

const BBoxImage = ({ imageLink, BBox }) => {
	const imageRef = React.useRef(null);
	const [ratio, setRatio] = useState(1);

	let top = 0,
		bot = 0,
		left = 0,
		right = 0,
		width = 0,
		height = 0;

	let drawBBox = false;
	if ((BBox || []).length > 0) {
		drawBBox = true;
	}

	if (drawBBox) {
		[top, bot, left, right] = BBox;
		width = Math.abs(right - left);
		height = Math.abs(bot - top);
	}

	useEffect(() => {
		const image = imageRef.current;
		setRatio(image.width / image.naturalWidth);
	});
	return (
		<>
			{drawBBox && (
				<div
					style={{
						position: "absolute",
						border: "1px solid red",
						backgroundColor: "transparent",
						width: `${width * ratio}px`,
						height: `${height * ratio}px`,
						left: `${(left || 0) * ratio}px`,
						top: `${(top || 0) * ratio}px`,
					}}
				></div>
			)}
			<StytedImage
				ref={imageRef}
				src={imageLink}
				alt="Oxford building"
				loading="lazy"
			/>
		</>
	);
};
