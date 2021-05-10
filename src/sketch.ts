// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------
function draw() {
    if(img)
        image(img,0,0,width,height)
}

// -------------------
//    Initialization
// -------------------

let img: p5.Element
let compteur=0;
const z = []
var frameNB=0;
let i=0;
const ai = new rw.HostedModel({
    url: "https://cmu-buildinggenerator-f76a2661.hosted-models.runwayml.cloud/v1/",
  token: "wsttGO2jd1dQZrSXEqMeZw==",
  });

  ai.info().then(info => console.log(info));

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function make_request() {
  
    if(frameNB==150){
        return;
    }
    const inputs = {
        "z": z,
        "truncation": 0.8
      };
    sleep(100);
    ai.query(inputs).then(outputs => {
        const { image } = outputs;
        // use the outputs in your project
        img = createImg(image)
        img.hide()
        z[i]+=0.5
        compteur++
        if(compteur==10){
            compteur=0;
            i++;
        }
        p5.prototype.downloadFile(image, frameNB.toString(), "png")
        frameNB++
        make_request()
        console.log(frameNB)
        
      });
}

function setup() {
    p6_CreateCanvas()
    for (let i = 0; i < 512; i++) {
        z[i] = random(-0.5, 0.5)
    }
    make_request()
}



function windowResized() {
    p6_ResizeCanvas()
}