import React from "react";

const ImageComparator = ({base, incoming, delta, update}) => {
	const x = 1;
	return (
		<div className="image-comparator">
			<div>
				<p>Incoming</p>
				<img src={incoming} />
			</div>
			<div>
				<p>Base</p>
				<img src={base} />
			</div>
			<div>
				<p>Delta</p>
				<img src={delta} />
			</div>
			<button onClick={update}>Save Incoming as Base</button>
		</div>
	);
};

export default ImageComparator;
