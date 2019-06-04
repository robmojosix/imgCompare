import React, {useState} from "react";
import ReactCompareImage from "react-compare-image";
import {Row, Col, Card, Button, ButtonToolbar} from "react-bootstrap";

const ImageComparator = ({img, update}) => {
	const [showDelta, setDelta] = useState(false);

	console.log("img", img);

	return (
		<Row className="image-comparator-row">
			<Col className="image-comparator">
				<Card>
					<Card.Header as="h5">{img.incoming}</Card.Header>
					<Row>
						<Col>
							<Card.Text className="text-center">Incoming</Card.Text>
						</Col>
						<Col>
							<Card.Text className="text-center">Base</Card.Text>
						</Col>
					</Row>
					<div className="images">
						{showDelta ? <Card.Img className="delta" variant="top" src={img.delta} /> : null}
						<ReactCompareImage
							leftImage={img.incoming}
							rightImage={img.base}
							rightImageLabel="Base"
							leftImageLabel="Incoming"
						/>
					</div>
					<ButtonToolbar>
						<Button className="cardButtons" onClick={() => setDelta(!showDelta)} variant="secondary">
							Toggle Delta
						</Button>
						<Button className="cardButtons" onClick={() => update(img)} variant="warning">
							Update Image
						</Button>
					</ButtonToolbar>
				</Card>
			</Col>
		</Row>
	);
};

export default ImageComparator;
