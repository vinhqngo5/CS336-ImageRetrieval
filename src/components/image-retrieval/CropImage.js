import { PhotoCamera } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";

class CropImage extends PureComponent {
	state = {
		src: this.props.queryImage,
		crop: {
			unit: "%",
			width: 30,
			// aspect: 16 / 9,
		},
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
		let croppedImageMaxHeight = this.imageRef?.clientHeight;
		if (croppedImageMaxHeight && croppedImageMaxHeight > 350) {
			croppedImageMaxHeight = 350;
		}
		this.setState({ croppedImageMaxHeight });
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.queryImage !== this.state.src) {
			this.setState({ src: nextProps.queryImage });
		}
	}

	render() {
		// this.setState({ src: this.props.queryImage })
		let { crop, croppedImageUrl, croppedImageMaxHeight, src } = this.state;

		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: src ? "space-between" : "center",
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
							width: "65%",
							minWidth: "65%",
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
					<img
						alt="Crop"
						style={{
							borderRadius: "4px",
							maxWidth: "35%",
							maxHeight: `${croppedImageMaxHeight}px`,
							marginLeft: "20px",
							overflow: "hidden",
						}}
						src={croppedImageUrl}
					/>
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
