import React, { useState } from 'react';

function LoadAndPreviewImage() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<input type="file" onChange="previewFile()"/>
			<img src="" height="200" alt="Image preview..."/>
		</div>
	);
}

export default LoadAndPreviewImage;
