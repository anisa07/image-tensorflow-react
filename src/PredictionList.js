import React, { useContext } from 'react';
import { MlContext } from "./context";

function PredictionList () {
	const appContext = useContext(MlContext);
	const { topPredictions } = appContext;

	return (
		<div className={topPredictions.length ? 'prediction-container' : 'hide'}>
			<h3>Predictions</h3>
			<ol>
				{topPredictions.map((prediction) => (
					<li key={prediction.className + prediction.probability}>
						{prediction.className}
						<span> - {prediction.probability.toFixed(3)}</span>
					</li>
				))}
			</ol>
		</div>
	)
}

export default PredictionList;
