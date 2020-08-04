import { Loop, MembraneSynth, Transport, AMSynth, PluckSynth } from 'tone';

let loopBeat;
let counter = 0;

let bassSynth = new MembraneSynth().toDestination();

let cymbalSynth = new MembraneSynth().toDestination();

let amSynth = new AMSynth().toDestination();
amSynth.envelope.decay = 0.1;
amSynth.envelope.release = 1;

let pluckSynth = new PluckSynth().toDestination();

loopBeat = new Loop(time => {
  if (counter % 4 === 0) {
    bassSynth.triggerAttackRelease('c2', '4n', time, 0.6);
  }

  if (counter % 2 === 0) {
    cymbalSynth.triggerAttackRelease('a2', '4n', time, 0.1);
  }

  if (counter === 2) {
    // fatOsc.
    cymbalSynth.triggerAttackRelease('a2', '4n', time, 0.1);
  }

  if (counter === 15 || counter === 16) {
    cymbalSynth.triggerAttackRelease('a2', '4n', time, 0.1);
  }

  if (counter === 29 || counter === 30 || counter === 31 || counter === 32) {
    cymbalSynth.triggerAttackRelease('a2', '4n', time, 0.1);
  }

  if (counter === 0) {
    amSynth.triggerAttackRelease('A4', '8n', time, 0.1);
  }

  if (counter === 10) {
    amSynth.triggerAttackRelease('Bb4', '8n', time, 0.1);
  }

  if (counter === 16) {
    amSynth.triggerAttackRelease('f4', '8n', time, 0.1);
  }

  if (counter % 2 === 0) {
    pluckSynth.triggerAttackRelease('c5', '16n', time, 0.1);
  } else {
    pluckSynth.triggerAttackRelease('b5', '16n', time, 1);
  }

  counter = (counter + 1) % 32;
}, '16n');

loopBeat.start(0);

Transport.bpm.value = 120;

// Transport.start();

let button = document.querySelector('button');
button.addEventListener('click', () => {});
