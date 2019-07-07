import React, { useContext } from 'react';
import {MlContext} from "./context";

function LoadAndPreviewImage() {
	const appContext = useContext(MlContext);
	const {url, loadImage, model, predictImage} = appContext;
	const imageRef = React.createRef();
	const fileRef = React.createRef();

	const handleOnChange = () => {
		const image = imageRef.current;
		const file = fileRef.current;

		if (file.files[0]) {
			loadImage(file.files[0], image);
			predictImage(model, image)
		}
	};

	return (
		<div>
			<input ref={fileRef} type="file" onChange={handleOnChange}/>
			<img ref={imageRef} src={url} height="224" alt="Image preview..."/>
		</div>
	);
}

export default LoadAndPreviewImage;
