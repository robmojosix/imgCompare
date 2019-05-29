import React from "react";
import ImageComparator from "./components/ImageComparator";
import {Container} from "react-bootstrap";

import config from "../package.json";

const removeStaticFolderPath = arrayOfPaths => {
	return arrayOfPaths.map(paths => {
		const returnObject = {};
		Reflect.ownKeys(paths).forEach(key => {
			returnObject[key] = paths[key].split(config.staticFiles.staticPath)[1];
		});
		return returnObject;
	});
};

const App = () => {
	const handleUpdate = () => {
		fetch("/update-file", {
			method: "PUT",
			body: {
				file: "xyz.png"
			}
		}).then(response => response.json());
	};

	const mismatchImagePaths = removeStaticFolderPath(window.mismatchImages || []);

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Image regression failures</h1>
			</header>
			<Container>
				{mismatchImagePaths.map((img, index) => {
					return (
						<ImageComparator
							key={index}
							update={handleUpdate}
							base={img.base}
							incoming={img.incoming}
							delta={img.delta}
						/>
					);
				})}
			</Container>
		</div>
	);
};

export default App;
