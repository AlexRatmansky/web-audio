window.onload = () => {
  const beepBlock = document.querySelector('[data-js=beep]');
  const beepSound = e => {
    playSweep();
  };

  const button = document.getElementById('button');
  const buttonSound = () => {
    const audioCtx = new AudioContext();

    fetch('/beep.ogg').then(a => {
      console.log('beep');

      const source = audioCtx.createBufferSource();
      a.arrayBuffer().then(audioBuffer => {
        audioCtx.decodeAudioData(audioBuffer).then(buffer => {
          source.buffer = buffer;
        });
        source.connect(audioCtx.destination);

        source.start(0);
      });
    });
  };

  const a = [220, 440, 880];
  let pointer = 0;

  function playSweep() {
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    osc.frequency.value = a[pointer];

    pointer++;
    if (pointer === a.length) pointer = 0;

    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  }

  let audioCtx;

  document.addEventListener('click', () => {
    if (!audioCtx) audioCtx = new AudioContext();

    beepBlock.addEventListener('click', beepSound);
    button.addEventListener('mouseenter', buttonSound);
  });
};
