import React from "react";
import ReactCompareImage from "react-compare-image";
import {Row, Col, Card, Button, ButtonToolbar} from "react-bootstrap";

const ImageComparator = ({base, incoming, delta, update, toggleDelta, showDelta = false}) => {
	return (
		<Row className="image-comparator-row">
			<Col className="image-comparator">
				<Card>
					{showDelta ? <Card.Img variant="top" src={delta} /> : null}
					<Card.Header as="h5">{incoming}</Card.Header>
					<Row>
						<Col>
							<Card.Text className="text-center">Incoming</Card.Text>
						</Col>
						<Col>
							<Card.Text className="text-center">Base</Card.Text>
						</Col>
					</Row>
					<ReactCompareImage
						leftImage={incoming}
						rightImage={base}
						rightImageLabel="Base"
						leftImageLabel="Incoming"
					/>
					<ButtonToolbar>
						<Button className="cardButtons" onClick={toggleDelta} variant="primary">
							Toggle Delta
						</Button>
						<Button className="cardButtons" onClick={update} variant="primary">
							Update Image
						</Button>
					</ButtonToolbar>
				</Card>
			</Col>
		</Row>
	);
};

export default ImageComparator;
