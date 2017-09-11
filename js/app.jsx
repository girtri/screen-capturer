
import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-diff-logger';
import {Provider} from "react-redux";
import App from "./Containers/App.jsx";
import {appReducer} from "./Reducers";
import DevTools from "./Components/DevTools.jsx";
import Fsys from "./Service/Capturer/Fsys";
import Dom from "./Service/Capturer/Dom";
import Capturer from "./Service/Capturer";
import Tray from "./Service/Tray";
import Shortcut from "./Service/Shortcut";

const storeEnhancer = compose(
	applyMiddleware(logger),
	DevTools.instrument()
);

const store = createStore(appReducer, storeEnhancer);
const capturer = new Capturer(new Fsys(), new Dom());
const tray = new Tray(capturer, store);
const shortcut = new Shortcut(capturer, store)

render(<Provider store={store}>
		<div>
			<App capturer={capturer} />
			<DevTools />
		</div>
	   </Provider>, document.querySelector("root"));

tray.render();
shortcut.registerAll();
