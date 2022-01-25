import { Box, styled } from "@mui/system";
import React, { useEffect } from "react";
import {
	Autocomplete,
	Button,
	ImageList,
	ImageListItem,
	Skeleton,
	Switch,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { getBase64FromUrl } from "../../utils/getBase64FromUrl";
import {
	BlogCaption,
	BlogCaptionSmall,
	BlogSubtitle,
} from "../common/BlogTypography";
import { imageRetrievalState$ } from "../../redux/selectors";
import { STATIC_URL } from "../../config";

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
	const dispatch = useDispatch();
	const imageRetrievalState = useSelector(imageRetrievalState$);

	// const [images, setImages] = useState([]);
	const images = imageRetrievalState.suggestedImages;
	const [isOpened, setIsOpened] = useState(false);

	const loadImages = () => {
		dispatch(
			actions.fetchSuggestedImages.fetchSuggestedImagesRequest("christ_church")
		);
	};

	const handleChange = (event) => {
		setIsOpened(event.target.checked);

		if (event.target.checked && images.length == 0) {
			loadImages();
		}
	};

	useEffect(() => {
		// loadImages();
	}, []);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<BlogSubtitle>Turn on image suggest</BlogSubtitle>
				<Switch
					checked={isOpened}
					onChange={handleChange}
					inputProps={{ "aria-label": "controlled" }}
				/>
			</Box>
			{!isOpened ? (
				<BlogCaptionSmall>
					Browse more images of Oxford buildings based on 11 available queries
				</BlogCaptionSmall>
			) : (
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
							onClick={loadImages}
						>
							Search
						</Button>
					</Box>
					<MasonryImageList images={images} />
				</Box>
			)}
		</>
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

function MasonryImageList({ images }) {
	const dispatch = useDispatch();
	const imageRetrievalState = useSelector(imageRetrievalState$);

	const selectQueryImage = (image) => {
		getBase64FromUrl(image).then((img) => {
			dispatch(actions.selectQueryImage(img));
		});
	};

	return (
		<Box sx={{ overflowY: "scroll", height: "95vh", width: "100%" }}>
			<ImageList variant="masonry" cols={2} gap={12}>
				{!imageRetrievalState.isLoadingSuggestedImages
					? images.map((image, index) => (
							<ImageListItem key={index}>
								<StytedImage
									onClick={() => selectQueryImage(`${STATIC_URL}/${image}`)}
									src={`${STATIC_URL}/${image}`}
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
