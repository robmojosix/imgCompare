import React, {Component} from "react";
import ImageComparator from "./components/ImageComparator";
import {Container} from "react-bootstrap";
import {Modal, Button} from "react-bootstrap";

const removeFilesFromGlobal = files => {
	window.mismatchImages = window.mismatchImages.filter(img => JSON.stringify(img) === JSON.stringify(files));
};

class App extends Component {
	constructor() {
		super();

		this.state = {
			showModel: false
		};

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleCloseModel = this.handleCloseModel.bind(this);
	}

	handleUpdate(files) {
		const data = JSON.stringify({files});

		const options = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: data
		};

		fetch("/update-files", options).then(res => {
			if (res.status === 200) {
				removeFilesFromGlobal(files);
				this.setState({showModel: true});
			}
		});
	}

	handleCloseModel() {
		this.setState({showModel: false});
	}

	render() {
		const mismatchImagePaths = window.mismatchImages || [];

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Image regression failures</h1>
				</header>
				<Container>
					{mismatchImagePaths.map((img, index) => {
						return <ImageComparator key={index} img={img} update={this.handleUpdate} />;
					})}
				</Container>
				<Modal show={this.state.showModel} onHide={this.handleCloseModel}>
					<Modal.Header closeButton>
						<Modal.Title>File Updated!</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCloseModel}>
							Ok
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default App;
