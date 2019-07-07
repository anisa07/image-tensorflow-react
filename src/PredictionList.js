import React, { useContext } from 'react';
import {MlContext} from "./context";

function PredictionList () {
	const appContext = useContext(MlContext);
	const { topPredictions } = appContext;

	console.log('topPredictions', topPredictions);
	return (
		<ol>
			{topPredictions.map((prediction, i) => (
				<li key={prediction.className + prediction.probability}>{prediction.className}</li>
			))}
		</ol>
	)
}

export default PredictionList;
