import React from "react";
import ReactCompareImage from "react-compare-image";
import {Row, Col, Card, Button} from "react-bootstrap";

const ImageComparator = ({base, incoming, delta, update}) => {
	const x = 1;
	return (
		<Row>
			<Col className="image-comparator">
				<Card>
					<ReactCompareImage
						leftImage={incoming}
						rightImage={base}
						rightImageLabel="Base"
						leftImageLabel="Incoming"
					/>
				</Card>
			</Col>
			<Col>
				<Card style={{width: "18rem"}}>
					<Card.Img variant="top" src={delta} />
					<Card.Body>
						<Card.Title>Delta</Card.Title>
						<Card.Text>Was this expected? You can update the base image with incoming?</Card.Text>
						<Button onClick={update} variant="primary">
							Update
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default ImageComparator;
