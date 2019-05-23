import React from "react";
import ImageComparator from "./components/ImageComparator";

import config from "../package.json";

import mismatchImages from "../tmp/mismatchImages";

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
		console.log("update");
	};

	const mismatchImagePaths = removeStaticFolderPath(mismatchImages);

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Image regression failures</h1>
			</header>
			<div>
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
			</div>
		</div>
	);
};

export default App;
