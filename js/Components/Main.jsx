
import React, {Component} from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import FontIcon from "material-ui/FontIcon";
import TitleBar from "./TitleBar.jsx";
import ScreenshotTab from "./ScreenshotTab.jsx";
import AnimationTab from "./AnimationTab.jsx";
import { TAB_SCREENSHOT, TAB_ANIMATION } from "../Constants";

class Main extends Component 
{
	onTabNav = (tab) => {
		const {actions} = this.props;
		return () => {
			actions.setActiveTab(tab);
		};
	}

	render() {
		const ScreenshotIcon = <FontIcon className="materialicons">camera_alt</FontIcon>;
		const AnimationIcon = <FontIcon className="materialicons">video_call</FontIcon>;
		const {states, actions} = this.props;
		
		return (
			<div>
				<TitleBar />
				<Tabs>
					<Tab icon={ScreenshotIcon} label="SCREENSHOT" onActive={this.onTabNav(TAB_SCREENSHOT)} />
					<Tab icon={AnimationIcon} label="ANIMATION" onActive={this.onTabNav(TAB_ANIMATION)} />
				</Tabs>
				<div>
					{states.activeTab === TAB_SCREENSHOT
						? <ScreenshotTab {...this.props} />
						: <AnimationTab {...this.props} />
					}
				</div>
			</div>
		);
	}
}

export default Main;
