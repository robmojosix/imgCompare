import React from "react";
import ReactCompareImage from "react-compare-image";

const ImageComparator = ({base, incoming, delta, update}) => {
	const x = 1;
	return (
		<div className="image-comparator">
			<ReactCompareImage
				leftImage={incoming}
				rightImage={base}
				rightImageLabel="Base"
				leftImageLabel="Incoming"
			/>
			;
			<div>
				<img src={delta} />
			</div>
			<button onClick={update}>Save Incoming as Base</button>
		</div>
	);
};

export default ImageComparator;
