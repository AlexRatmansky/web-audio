let snareNoise;
let env;
let snPat;
let drums;
let bpFilter;
let rev;

function setup() {
  snPat = [1, 0, 0, 0, 1, 0, 1, 0];

  snareNoise = new p5.Noise();
  snareNoise.start();
  snareNoise.disconnect();

  bpFilter = new p5.BandPass();
  bpFilter.freq(350);
  bpFilter.res(3);

  rev = new p5.Reverb();

  snareNoise.connect(bpFilter);

  // bpFilter.amp(0.1);

  bpFilter.connect(rev);

  env = new p5.Envelope();
  env.set(0.005, 1, 0.01, 0.001, 0.1, 0);

  snareNoise.amp(env);

  drums = new p5.Part();
  drums.addPhrase(
    'snare drum',
    time => {
      env.play(snareNoise, time, 0);
    },
    snPat
  );

  // drums.loop();
}
