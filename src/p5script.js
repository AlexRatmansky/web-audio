let fft;
let setVolume;
let chooseNoise;
let button;
let isPlaying = false;

function setup() {
  createCanvas(400, 200);
  fft = new p5.FFT();

  let b = new p5.Noise();
  b.amp(0.1);

  button = createButton('on/off');
  button.mouseClicked(() => {
    isPlaying = !isPlaying;

    isPlaying ? b.start() : b.stop();
  });

  chooseNoise = createSelect();

  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(() => {
    b.setType(chooseNoise.value());
  });

  setVolume = createSlider(-60, 0, -60, 1);
  setVolume.input(() => {
    if (setVolume.value() > -56) {
      b.amp(pow(10, setVolume.value() / 20), 0.01);
    } else {
      b.amp(map(setVolume.value(), -60, -56, 0, 0.016), 0.1);
    }
  });

  background(80);
  stroke('white');
}

function draw() {
  background(80);
  let spectrum = fft.analyze();

  beginShape();

  for (let i = 0; i < spectrum.length; i++) {
    vertex(
      map(log(i), 0, log(spectrum.length), 0, width),
      map(spectrum[i], 0, 255, height, 0)
    );
  }

  endShape();
}
