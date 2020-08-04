let hh, clap, bass;
let pattern;
let hPhrase, cPhrase, bPhrase;
let drums;
let bpmCtrl;
let beatLength;
let cellWidth;
let ctx;
let cursorPos;

function setup() {
  ctx = createCanvas(320, 60);
  ctx.mousePressed(canvasPressed);

  beatLength = 16;

  cellWidth = width / beatLength;

  cursorPos = 0;

  hh = loadSound('hh_sample.mp3');
  clap = loadSound('clap_sample.mp3');
  bass = loadSound('bass_sample.mp3');

  pattern = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  ];

  hPhrase = new p5.Phrase(
    'hh',
    time => {
      hh.play(time);
    },
    pattern[0]
  );

  cPhrase = new p5.Phrase(
    'clap',
    time => {
      clap.play(time);
    },
    pattern[1]
  );

  bPhrase = new p5.Phrase(
    'bass',
    time => {
      bass.play(time);
    },
    pattern[2]
  );

  drums = new p5.Part();

  drums.addPhrase(hPhrase);
  drums.addPhrase(cPhrase);
  drums.addPhrase(bPhrase);
  drums.addPhrase('seq', sequence, pattern[3]);

  bpmCtrl = createSlider(20, 300, 80, 1);
  bpmCtrl.position(10, 70);
  bpmCtrl.input(() => {
    drums.setBPM(bpmCtrl.value());
  });

  drums.setBPM('80');

  drawMatrix();
}

function keyPressed() {
  if (key === ' ') {
    if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
      if (drums.isPlaying) {
        drums.stop();
      } else {
        drums.loop();
      }
    }
  }
}

function canvasPressed() {
  let rowClicked = floor((3 * mouseY) / height);
  let colClicked = floor((beatLength * mouseX) / width);

  pattern[rowClicked][colClicked] = +!pattern[rowClicked][colClicked];

  drawMatrix();
}

function drawMatrix() {
  background(80);
  stroke('grey');
  strokeWeight(2);
  fill('white');

  for (let i = 0; i <= beatLength; i++) {
    line(i * cellWidth, 0, i * cellWidth, height);
  }
  for (let i = 0; i <= 3; i++) {
    line(0, i * (height / 3), width, i * (height / 3));
  }

  noStroke();

  for (let i = 0; i < beatLength; i++) {
    if (pattern[0][i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 6, 10);
    }
    if (pattern[1][i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 2, 10);
    }
    if (pattern[2][i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height * (5 / 6), 10);
    }
  }
}

function sequence(time, beatIndex) {
  setTimeout(() => {
    drawMatrix();
    stroke('red');
    fill(255, 0, 0, 30);
    rect((beatIndex - 1) * cellWidth, 0, cellWidth, height);
  }, time * 1000);
}
