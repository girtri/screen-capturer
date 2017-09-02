
import * as fs from "fs";
const appWindow = nw.Window.get();
const ICON = `./assets/icon-48x48.png`;
const toBuffer = require( "blob-to-buffer" );

export default class Capturer 
{
	constructor(fsys, dom) {
		this.fsys = fsys;
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

	takeScreenshot(filenameRaw) {
	    const base64Data = this.dom.getVideoFrameAsBase64(),
	          filename = this.fsys.saveFile(filenameRaw, base64Data, ".png");
	    new Notification( "Screenshot saved",  {
	      body: `The screenshot was saved as ${filename}`,
	      icon: ICON
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
			let chunks = [];
			// stream to HTMLVideoElement
			this.dom.video.srcObject = stream;
			this.mediaRecorder = new MediaRecorder(stream);
			
			this.mediaRecorder.onstop = (e) => {
				const blob = new Blob(chunks, { type: "video/webm" });
				toBuffer(blob, (err, buffer) => {
					if (err) {
						throw err;
					}
					this.saveAnimationBuffer(buffer);
					chunks = [];
				});
			}

			this.mediaRecorder.ondataavailable = function(e) {
				chunks.push(e.data);
			}
		}, (error) => {
			console.log("navigator.getUserMedia error: ", error);
		});
	}

	record(filenameRaw) {
		this.mediaRecorder.start();
		this.saveAnimationBuffer = (buffer) => {
			const filename = this.fsys.saveFile(filenameRaw, buffer, ".webm" );
			new Notification( "Animation saved", {
				body: `The animation was saved as ${filename}`,
				icon: ICON
			});
		}
	}

	stop() {
		this.mediaRecorder.stop();
	}
}