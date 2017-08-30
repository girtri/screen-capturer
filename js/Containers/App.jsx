
import React, {Component} from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import Main from "../Components/Main.jsx";
import {deepOrange500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../Actions";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

const mapStateToProps = (state) => ({ states: state });
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component 
{
	render() {
	    return (
	        <MuiThemeProvider muiTheme={muiTheme}>
	        	<Main {...this.props} />
	        </MuiThemeProvider>
	    );
	}
}
