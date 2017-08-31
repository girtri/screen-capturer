
import * as fs from "fs";
const appWindow = nw.Window.get(),
	ICON = `./assets/icon-48x48.png`;

export default class Capturer 
{
	constructor(dom) {
		this.dom = dom;

		// custom method
		Capturer.detectDesktopStreamId((id) => {
			this.start(id);
		});

		/* standard method
		nw.Screen.chooseDesktopMedia(["window", "screen"], (id) => {
			this.start(id);
		});
		*/
	}

	static detectDesktopStreamId(done) {
		const dcm = nw.Screen.DesktopCaptureMonitor;
		nw.Screen.Init();
		// New screen target detected
		dcm.on("added", (id, name, order, type) => {
			// We are interested only in screens
			if (type !== "screen") {
				return;
			}
			done(dcm.registerStream(id));
			dcm.stop();
		});
		dcm.start(true, true);
	}

	takeScreenshot(filename) {
		const base64Data = this.dom.getVideoFrameAsBase64();
		fs.writeFileSync(filename, base64Data, "base64");
		new Notification("Screenshot saved", {
			body: `The screenshot was saved as ${filename}`,
			icon: `./assets/icon-48x48.png`
		});
	}

	start(desktopStreamId) {
		navigator.webkitGetUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: "desktop",
					chromeMediaSourceId: desktopStreamId,
					minWidth: 1280,
					maxWidth: 1920,
					minHeight: 720,
					maxHeight: 1080
				}
			}
		}, (stream) => {
			// stream to HTMLVideoElement
			this.dom.video.srcObject = stream;
		}, (error) => {
			console.log("navigator.getUserMedia error: ", error);
		});
	}
}