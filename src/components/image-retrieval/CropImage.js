import { PhotoCamera } from "@mui/icons-material";
import { Button, Input, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import { BlogH7 } from "../common/BlogTypography";

const initCropConfig = {
	unit: "%",
	width: 50,
	height: 50,
	x: 20,
	y: 20,
};
class CropImage extends PureComponent {
	state = {
		src: this.props.queryImage,
		crop: initCropConfig,
		croppedImageMaxHeight: 0,
	};

	onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				this.setState({ src: reader.result });
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// If you setState the crop in here you should return false.
	onImageLoaded = (image) => {
		this.imageRef = image;
		let croppedImageMaxHeight = this.imageRef?.clientHeight;
		this.setState({ croppedImageMaxHeight });
	};

	onCropComplete = (crop) => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop, percentCrop) => {
		// You could also use percentCrop:
		// this.setState({ crop: percentCrop });
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
				this.imageRef,
				crop,
				"newFile.jpeg"
			);
			this.setState({ croppedImageUrl });
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement("canvas");
		const pixelRatio = window.devicePixelRatio;
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext("2d");

		canvas.width = crop.width * pixelRatio * scaleX;
		canvas.height = crop.height * pixelRatio * scaleY;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = "high";

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						//reject(new Error('Canvas is empty'));
						console.error("Canvas is empty");
						return;
					}
					blob.name = fileName;
					window.URL.revokeObjectURL(this.fileUrl);
					this.fileUrl = window.URL.createObjectURL(blob);
					resolve(this.fileUrl);
				},
				"image/jpeg",
				1
			);
		});
	}

	componentDidUpdate() {
		// if (this.state.croppedImageMaxHeight !== this.imageRef?.clientHeight) {
		// 	console.log("sdfsdf");
		// 	let croppedImageMaxHeight = this.imageRef?.clientHeight;
		// 	this.setState({ croppedImageMaxHeight });
		// }
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.queryImage !== this.state.src) {
			this.setState({ src: nextProps.queryImage, crop: initCropConfig });
		}
	}

	render() {
		// this.setState({ src: this.props.queryImage })
		let { crop, croppedImageUrl, croppedImageMaxHeight, src } = this.state;

		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: src ? "flex-start" : "center",
					alignItems: "center",
					width: "100%",
				}}
			>
				{src ? (
					<ReactCrop
						src={src}
						crop={crop}
						style={{
							borderRadius: "4px",
							// width: "65%",
							// minWidth: "65%",
							flexShrink: "0",
							maxWidth: "65%",
							overflow: "hidden",
						}}
						ruleOfThirds
						onImageLoaded={this.onImageLoaded}
						onComplete={this.onCropComplete}
						onChange={this.onCropChange}
					/>
				) : (
					<label
						htmlFor="icon-button-file"
						style={{
							width: "50%",
							height: "200px",
							marginRight: "20px",
						}}
					>
						<Input
							type="file"
							id="icon-button-file"
							onChange={this.onSelectFile}
							accept="image/*"
							style={{ display: "none" }}
						/>
						<Button
							onClick={this.onSelectFile}
							sx={{
								borderRadius: "4px",
								height: "100%",
								width: "100%",
								color: "text.primary",
								backgroundColor: "background.paper",
								"&:hover": {
									backgroundColor: "background.alpha",
								},
							}}
							variant="text"
							component="span"
							endIcon={<PhotoCamera />}
						>
							Pick or Upload an Image
						</Button>
					</label>
				)}
				{croppedImageUrl && (
					<Paper
						variant="outlined"
						elevation={0}
						sx={{
							maxHeight: `${croppedImageMaxHeight}px`,
							marginLeft: "20px",
							height: `${croppedImageMaxHeight}px`,
							flexGrow: "1",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							borderWidth: "1px",
							borderStyle: "solid",
							borderColor: "divider.main",
							position: "relative",
						}}
					>
						<Box
							sx={{
								flexGrow: "1",
								display: "flex",
								margin: "10px 10px",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<img
								alt="Crop"
								style={{
									borderRadius: "4px",

									maxHeight: `${(croppedImageMaxHeight * 80) / 100}px`,
									maxWidth: `calc(100% - 20px)`,
									overflow: "hidden",
								}}
								src={croppedImageUrl}
							/>
						</Box>
						<BlogH7 sx={{ marginBottom: "10px" }}>Query Image</BlogH7>
					</Paper>
				)}
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		queryImage: state.imageRetrievalState.queryImage,
	};
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps())(CropImage);
