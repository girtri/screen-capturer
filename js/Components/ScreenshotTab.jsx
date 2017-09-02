
import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import { TAB_BUTTON_STYLE, SCREENSHOT_DEFAULT_FILENAME } from "../Constants";

export default class ScreenshotTab extends Component 
{
	onFilenameChange = (e) => {
		const {value} = e.target;
		const {actions} = this.props;
		
		if (!value.endsWith(".png") || value.length < 6 ) {
			actions.setScreenshotInputError( "File name cannot be empty and must end with .png" );
			return;
		}

		actions.setScreenshotInputError("");
		actions.setScreenshotFilename(value);
	}

	// Handle when clicked CAPTURE
	onCapture = () => {
		const {states} = this.props;
		this.props.capturer.takeScreenshot(states.screenshotFilename);
	}

	render() {
		const { states } = this.props;

		return (
			<div className="tab-layout">
				<div className="tab-layout__item">
					<TextField floatingLabelText="File name pattern" defaultValue={SCREENSHOT_DEFAULT_FILENAME} onChange={this.onFilenameChange} errorText={states.screenshotInputError} />
				</div>
				<div className="tab-layout__item">
					<IconButton tooltip="Take screenshot" iconClassName="material-icons" iconStyle={TAB_BUTTON_STYLE} onClick={this.onCapture}>add_a_photo</IconButton>
				</div>
			</div>
		)
	}
}
