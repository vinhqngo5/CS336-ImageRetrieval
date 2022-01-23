import React from "react";
import MainColumnContainer from "../../components/layout/mainColumnContainer/MainColumnContainer";
import RetrieveImageRightSideBar from "../../components/image-retrieval/RetrieveImageRightSideBar";
import ImageRetrivalMainColumn from "../../components/image-retrieval/ImageRetrivalMainColumn";
export default function RetrieveImage() {
	return (
		<MainColumnContainer RightSideBar={RetrieveImageRightSideBar}>
			<ImageRetrivalMainColumn />
		</MainColumnContainer>
	);
}
