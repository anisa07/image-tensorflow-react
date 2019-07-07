import React from 'react';
import LoadAndPreviewImage from './LoadAndPreviewImage';
import PredictionList from './PredictionList';

import './style.scss';

function App() {
	return (
		<div>
			<div className='classify-image'>
				<LoadAndPreviewImage />
				<PredictionList />
			</div>
		</div>
	);
}

export default App;
