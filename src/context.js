import React, { useState, useEffect } from 'react';
import { IMAGENET_CLASSES } from '../model/imagenet_classes';
const MlContext = React.createContext();
const tf = require('@tensorflow/tfjs');

const MlReactProvider = (props) => {
	const [url, setUrl] = useState(undefined);
	const [imageFile, setImageFile] = useState(undefined);
	const [model, setModel] = useState(undefined);
	const [topPredictions, setTopPredictions] = useState([]);
	const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
	const IMAGE_SIZE = 224;
	const TOPK_PREDICTIONS = 10;

	const loadImage = (file, image) => {
		const imageUrl = URL.createObjectURL(file);
		setUrl(imageUrl);
		setImageFile(image);
	};

	const loadModel = () => {
		if (!model) {
			fetchModel()
		}
	};

	const fetchModel = () => {
		if (!model) {
			tf.loadLayersModel(MODEL_URL).then(model => {
				setModel(model);
			}).catch(e => {
				console.log(`Error loading model ${e}`)
			});
		}
	};

	const predictImage = (model, image) => {
		const img = tf.browser
			.fromPixels(image)
			.resizeNearestNeighbor([IMAGE_SIZE, IMAGE_SIZE])
			.toFloat()
			.expandDims();
		const offset = tf.scalar(127.5);
		const normalized = img.sub(offset).div(offset);
		const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
		const predict = model.predict(batched);

		predict.data().then((r) => {
			const topPredictions = getTop(r, TOPK_PREDICTIONS) || [];

			setTopPredictions(topPredictions);
		});
	};

	const getTop = (values, topK) => {
		const valuesAndIndices = [];

		for (let i = 0; i < values.length; i++) {
			valuesAndIndices.push({value: values[i], index: i});
		}

		valuesAndIndices.sort((a, b) => {
			return b.value - a.value;
		});

		const topkValues = new Float32Array(topK);
		const topkIndices = new Int32Array(topK);

		for (let i = 0; i < topK; i++) {
			topkValues[i] = valuesAndIndices[i].value;
			topkIndices[i] = valuesAndIndices[i].index;
		}

		const topClassesAndProbs = [];

		for (let i = 0; i < topkIndices.length; i++) {
			topClassesAndProbs.push({
				className: IMAGENET_CLASSES[topkIndices[i]],
				probability: topkValues[i]
			})
		}

		return topClassesAndProbs;
	};

	useEffect(() => {
		loadModel();
	});

	return (
		<MlContext.Provider value={{
			url,
			imageFile,
			loadImage,
			model,
			loadModel,
			predictImage,
			topPredictions
		}}>
			{props.children}
		</MlContext.Provider>
	);
};

export { MlContext, MlReactProvider };
