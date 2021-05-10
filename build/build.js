var gui = new dat.GUI();
var params = {
    Ellipse_Size: 30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Ellipse_Size", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    if (img)
        image(img, 0, 0, width, height);
}
var img;
var compteur = 0;
var z = [];
var frameNB = 0;
var i = 0;
var ai = new rw.HostedModel({
    url: "https://cmu-buildinggenerator-f76a2661.hosted-models.runwayml.cloud/v1/",
    token: "wsttGO2jd1dQZrSXEqMeZw==",
});
ai.info().then(function (info) { return console.log(info); });
function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function make_request() {
    if (frameNB == 150) {
        return;
    }
    var inputs = {
        "z": z,
        "truncation": 0.8
    };
    sleep(100);
    ai.query(inputs).then(function (outputs) {
        var image = outputs.image;
        img = createImg(image);
        img.hide();
        z[i] += 0.5;
        compteur++;
        if (compteur == 10) {
            compteur = 0;
            i++;
        }
        p5.prototype.downloadFile(image, frameNB.toString(), "png");
        frameNB++;
        make_request();
        console.log(frameNB);
    });
}
function setup() {
    p6_CreateCanvas();
    for (var i_1 = 0; i_1 < 512; i_1++) {
        z[i_1] = random(-0.5, 0.5);
    }
    make_request();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map