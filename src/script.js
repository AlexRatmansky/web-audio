window.onload = () => {
  document.addEventListener('click', function() {
    // you'll put the PCM audio in here
    var audioBuffer = null;
    var audioCtx = new AudioContext();

    function getSound() {}

    getSound();

    let button = document.getElementById('button');

    button.addEventListener('mouseenter', () => {
      fetch('/beep.ogg').then(a => {
        var source = audioCtx.createBufferSource();
        a.arrayBuffer().then(audioBuffer => {
          audioCtx.decodeAudioData(audioBuffer).then(buffer => {
            source.buffer = buffer;
          });
          source.connect(audioCtx.destination);

          source.start(0);
          console.log('beep');
        });
      });
    });
  });
};
