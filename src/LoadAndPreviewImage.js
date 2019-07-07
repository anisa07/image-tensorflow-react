import React, { useContext, useEffect } from 'react';
import { MlContext } from "./context";

function LoadAndPreviewImage () {
	const appContext = useContext(MlContext);
	const { url, loadImage, model, predictImage } = appContext;
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
			<label className='button-label'>
				Load Image
				<input ref={fileRef} type="file" onChange={handleOnChange} size="60"/>
			</label>
			<div className={!url ? 'hide' : 'image-container'}>
				<h3>Image</h3>
				<img ref={imageRef} src={url} height="300" alt="Image preview..."/>
			</div>
		</div>
	);
}

export default LoadAndPreviewImage;
