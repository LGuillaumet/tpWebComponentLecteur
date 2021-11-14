import './libs/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};

const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>

  .audio-player-info {
    height: 50px;
    width: 350px;
    background: #444;
    box-shadow: 0 0 20px 0 #000a;
  
    font-family: arial;
    color: white;
    font-size: 0.75em;
    overflow: hidden;
  
    display: grid;
    grid-template-rows: 6px auto;
    align-items: center;
  }
  .timeline {
    background: white;
    width: 100%;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 10px 0 #0008;

  }
  .progress {
    background: coral;
    width: 0%;
    height: 100%;
  }
  .time {
    text-align: center;
  }

  .marqueeText {
    font-size: 2em;
    color: "orange";
    font-family: 'ds-digitalnormal' !important;
    }

  div audio {
    display: block;
    margin-bottom:10px;
    margin-left:10px;
  }
  
  #equalizer {
    border:1px solid;
  }
  .main {
    margin: 32px;
    border:1px solid;
    border-radius:15px;
    background-color:lightGrey;
    padding:10px;
    width:320px;
    box-shadow: 10px 10px 5px grey;
    text-align:center;
    font-family: "Open Sans";
    font-size: 12px;
  }
  
  
  div.controls:hover {
    color:blue;
    font-weight:bold;
  }
  div.controls label {
    display: inline-block;
    text-align: center;
    width: 50px;
  }
  
  div.controls label, div.controls input, output {
      vertical-align: middle;
      padding: 0;
      margin: 0;
     font-family: "Open Sans",Verdana,Geneva,sans-serif,sans-serif;
    font-size: 12px;
  }
  .marquee {
    width: 10vw;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .marquee span {
    display: inline-block;
    width: max-content;
  
    padding-left: 100%;
    /* show the marquee just outside the paragraph */
    will-change: transform;
    animation: marquee 15s linear infinite;
  }
  
  .marquee span:hover {
    animation-play-state: paused
  }
  
  
  @keyframes marquee {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
  
  
  /* Respect user preferences about animations */
  
  @media (prefers-reduced-motion: reduce) {
    .marquee span {
      animation-iteration-count: 1;
      animation-duration: 0.01; 
      /* instead of animation: none, so an animationend event is 
       * still available, if previously attached.
       */
      width: auto;
      padding-left: 0;
    }
  }


  .container {
    margin: 0 auto;
    width: 950px;
    display: grid;
    justify-items: center; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      "Preview1 Preview2 Preview3"
      "VUL playerInfo VUR"
      "Equalizer Equalizer Equalizer"
      "Balance Actions Volume"
      "Bonus Bonus Bonus"; 
  }
  .playerInfo { grid-area: playerInfo; }
  .VUL { grid-area: VUL; text-align: center; }
  .VUR { grid-area: VUR; text-align: center; }
  .Equalizer { grid-area: Equalizer; text-align: center; }
  .Actions { grid-area: Actions; text-align: center; }
  .Volume { grid-area: Volume; text-align: center; }
  .Balance { grid-area: Balance; text-align: center; }
  .Bonus { grid-area: Bonus; text-align: center; }
  .Preview1 { grid-area: Preview1; text-align: center; }
  .Preview2 { grid-area: Preview2; text-align: center; }
  .Preview3 { grid-area: Preview3; text-align: center; }


  
  </style>


  <div class="container">
  <audio id="myPlayer" crossorigin="anonymous">
  
  </audio>
  <br>
    <div class="playerInfo">
      <div class="audio-player-info">
      <div class="timeline">
        <div class="progress"></div>
      </div>
        <div class="time">
          <div class="current">0:00</div>
          <p class="marquee">
          <span class="marqueeText">
              Nom du fichier 
          </span>
          </p>
        </div>
  </div>
    </div>
    <div class="VUL">
        <webaudio-knob id="peakL" 
        src="./assets/imgs/VU_1.png"
        with="353"
        height="158"
        sprites="200"
        value=0 min=0 max=10 step=1
        diameter="300" 
        tooltip="power left: %d">
      </webaudio-knob>
    </div>
    <div class="VUR">
      <webaudio-knob id="peakR" 
      src="./assets/imgs/VU_1.png"
      with="353"
      height="158"
      sprites="200"
      value=0 min=0 max=10 step=1
      diameter="300" 
      tooltip="power right: %d">
    </webaudio-knob>
    </div>
    <div class="Equalizer"></div>
    <div class="Actions">
      <button id="play">Play</button> 
      <button id="pause">Pause</button>
      <button id="avance10">+10s</button>
      <button id="previous">previous</button>
      <button id="next">next</button>

      <br>
      <p>Speed</p>
      <webaudio-knob id="sliderSpeed" 
      sprites="30"
      value=1 min=0 max=4 step=1
      src="./assets/imgs/Slider1.png" 
      tooltip="Speed: x %d">
      </webaudio-knob>
      
    </div>

    <div class="Volume">
    <p>Volume</p>
    <webaudio-knob id="volumeKnob" 
      src="./assets/imgs/LittlePhatty.png" 
      value=0 min=0 max=1 step=0.01 
      diameter="32" 
      tooltip="Volume: %d">
    </webaudio-knob>
    </div>

    <div class="Balance"></div>
    <div class="Bonus"></div>
    <div class="Preview1">
    <canvas id="equalizer" width=300 height=100></canvas>

    </div>
    <div class="Preview2"></div>
    <div class="Preview3">
    <canvas id="spectrum" width=300 height=100></canvas>
    </div>
</div>


</html>
  `;


class MyAudioPlayer extends HTMLElement {
  initialized = false;

  constructor() {
    super();
    // Récupération des attributs HTML
    //this.value = this.getAttribute("value");

    // On crée un shadow DOM
    this.attachShadow({ mode: "open" });

    console.log("URL de base du composant : " + getBaseURL())
  }


  buildAudioGraph() {

    const sourceNode = this.audioContext.createMediaElementSource(this.player);

    // connect the source node to a stereo pannel
    this.stereoPanner = this.audioContext.createStereoPanner();
    sourceNode.connect(this.stereoPanner);


    this.player.onplay = (e) => { this.audioContext.resume(); }

    // fix for autoplay policy
    this.player.addEventListener('play', () => this.audioContext.resume());

    // Create an analyser node
    this.analyser = this.audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    this.analyser.fftSize = 1024;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    // connect the stereo pannel to the analyser
    this.stereoPanner.connect(this.analyser);
    // and teh analyser to the destination

    this.getTitle();

    this.analyser.connect(this.audioContext.destination);

    // This is new, we add another route from the stereoPanner node

    // two analysers for the stereo volume meters
    this.analyserLeft = this.audioContext.createAnalyser();
    this.analyserLeft.fftSize = 256;
    this.bufferLengthLeft = this.analyserLeft.frequencyBinCount;
    this.dataArrayLeft = new Uint8Array(this.bufferLengthLeft);

    this.analyserRight = this.audioContext.createAnalyser();
    this.analyserRight.fftSize = 256;
    this.bufferLengthRight = this.analyserRight.frequencyBinCount;
    this.dataArrayRight = new Uint8Array(this.bufferLengthRight);

    this.splitter = this.audioContext.createChannelSplitter();

    // connect the source to the analyser and the splitter
    this.stereoPanner.connect(this.splitter);

    // connect one of the outputs from the splitter to
    // the analyser
    this.splitter.connect(this.analyserLeft, 0, 0);
    this.splitter.connect(this.analyserRight, 1, 0);

    // No need to connect these analysers to something, the sound
    // is alreadu connected through the route that goes through
    // the analyser used for the waveform


  }

  clearAllCanvas() {
    this.canvasContextS.save();
    this.canvasContextE.save();


    // clear the canvas
    // like this: canvasContext.clearRect(0, 0, width, height);

    // Or use rgba fill to give a slight blur effect
    this.canvasContextS.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.canvasContextS.fillRect(0, 0, this.canvasSpectrum.width, this.canvasSpectrum.height);

    this.canvasContextE.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.canvasContextE.fillRect(0, 0, this.canvasEqualizer.width, this.canvasEqualizer.height);

    this.canvasContextS.restore();
    this.canvasContextE.restore();

  }

  visualize = () => {
    // clear the canvas
    // like this: this.canvasContextS.clearRect(0, 0, width, height);

    this.clearAllCanvas();

    this.drawVolumeMeters();
    this.drawWaveform();
    this.drawProgressBar();

    // call again the visualize function at 60 frames/s
    requestAnimationFrame(() => this.visualize());

  }


  connectedCallback() {
    // Appelée automatiquement par le browser
    // quand il insère le web component dans le DOM
    // de la page du parent..

    // On clone le template HTML/CSS (la gui du wc)
    // et on l'ajoute dans le shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // fix relative URLs
    this.fixRelativeURLs();

    window.onload = () => {


      this.audioPlayer = document.querySelector(".audio-player-info");

      this.player = this.shadowRoot.querySelector("#myPlayer");


      this.canvasSpectrum = this.shadowRoot.querySelector("#spectrum");
      this.canvasContextS = this.canvasSpectrum.getContext('2d');


      this.canvasEqualizer = this.shadowRoot.querySelector("#equalizer");
      this.canvasContextE = this.canvasEqualizer.getContext('2d');

      // Update the canvas to fill the space of the component.
      this.initializeAudio();
      this.initializeEqualizer();


      this.buildAudioGraph();

      requestAnimationFrame(this.visualize);


      this.playlist = [
        {
          name:"Can't stop - Red Hot Chili Peppers",
          src: "https://leo-guillaumet.com/webComponent/audio/playlist/Can't%20Stop.mp3",
        },
        {
        name:"CyberPunk Night City",
        src: "https://leo-guillaumet.com/webComponent/audio/playlist/NightCity.mp3",
      },
      {
        name:"Luv(sic) pt2 - Nujabes ",
        src: "https://leo-guillaumet.com/webComponent/audio/playlist/Luv%20(sic)%20pt2.mp3",
      },
      {
        name:"Aerodynamic - DaftPunk",
        src: "https://leo-guillaumet.com/webComponent/audio/playlist/Aerodynamic.mp3",
      },
      {
        name:"Wanna be Crazy - GuiltyGear",
        src: "https://leo-guillaumet.com/webComponent/audio/playlist/Wanna%20be%20Crazy.mp3",
      },
      {
        name:"Little Busters - The Pillows",
        src: "https://leo-guillaumet.com/webComponent/audio/playlist/Little%20Busters%20-%20The%20Pillows.mp3",
      },
      ];
      this.currentNbTrack = 0;  

      this.player.src = this.playlist[this.currentNbTrack].src;


      this.shadowRoot.querySelector(".marqueeText").textContent= this.playlist[this.currentNbTrack].name;

    }


    // on définit les écouteurs etc.
    this.defineListeners();
  }

  drawProgressBar() {
    setInterval(() => {
      const progressBar = this.shadowRoot.querySelector(".progress");
      progressBar.style.width = this.player.currentTime / this.player.duration * 100 + "%";
      this.shadowRoot.querySelector(".time .current").textContent = this.convertHMS(
        this.player.currentTime
      );
    }, 500);
  }

  drawWaveform() {
    this.canvasContextS.save();
    // Get the analyser data
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvasContextS.lineWidth = 2;
    this.canvasContextS.strokeStyle = 'lightBlue';

    // all the waveform is in one single path, first let's
    // clear any previous path that could be in the buffer
    this.canvasContextS.beginPath();

    var sliceWidth = this.canvasSpectrum.width / this.bufferLength;
    var x = 0;

    // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    this.heightScale = this.canvasSpectrum.height / 128;

    for (var i = 0; i < this.bufferLength; i++) {
      // dataArray[i] between 0 and 255
      var v = this.dataArray[i] / 255;
      var y = v * this.canvasSpectrum.height;

      if (i === 0) {
        this.canvasContextS.moveTo(x, y);
      } else {
        this.canvasContextS.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasContextS.lineTo(this.canvasSpectrum.width, this.canvasSpectrum.height / 2);

    // draw the path at once
    this.canvasContextS.stroke();
    this.canvasContextS.restore();
  }

  drawVolumeMeters() {
    this.canvasContextE.save();

    // set the fill style to a nice gradient
    this.canvasContextE.fillStyle = this.gradient;


    this.shadowRoot.querySelector("#peakR").value = this.decibelRight;
    this.shadowRoot.querySelector("#peakL").value = this.decibelLeft;


    // left channel
    this.analyserLeft.getByteFrequencyData(this.dataArrayLeft);
    this.averageLeft = this.getAverageVolume(this.dataArrayLeft);
    this.decibelLeft = this.getDecibel(this.dataArrayLeft);


    // draw the vertical meter for left channel
    this.canvasContextE.fillRect(0, this.canvasSpectrum.height - this.averageLeft, 25, this.canvasSpectrum.height);

    // right channel
    this.analyserRight.getByteFrequencyData(this.dataArrayRight);
    this.averageRight = this.getAverageVolume(this.dataArrayRight);
    this.decibelRight = this.getDecibel(this.dataArrayRight);


    // draw the vertical meter for left channel
    this.canvasContextE.fillRect(26, this.canvasSpectrum.height - this.averageRight, 25, this.canvasSpectrum.height);


    this.canvasContextE.restore();
  }

  initializeAudio() {
    if (this.initialized) return;
    var audioCtx = window.AudioContext || window.webkitAudioContext;

    this.initialized = true;

    this.audioContext = new audioCtx();
  }

  initializeEqualizer() {
    // create a vertical gradient of the height of the canvas
    this.gradient = this.canvasContextE.createLinearGradient(0, 0, 0, this.canvasSpectrum.height);
    this.gradient.addColorStop(1, '#000000');
    this.gradient.addColorStop(0.75, '#ff0000');
    this.gradient.addColorStop(0.25, '#ffff00');
    this.gradient.addColorStop(0, '#ffffff');
  }


  getAverageVolume(array) {
    var values = 0;
    var average;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
      values += array[i];
    }

    average = values / length;
    return average;
  }

  getDecibel(array) {
    var values = 0;
    var decibel;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
      values += Math.abs(array[i]);
    }

    decibel = Math.sqrt(values / length);
    // console.log(decibel);
    return decibel;
  }

    getTitle() {
      console.log(this.player.attributes);
  };



  convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (hours <= 0) {
      return minutes + ':' + seconds;
    }
    else if (hours < 10) { hours = "0" + hours; }

    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  }

  changeBalance(sliderVal) {
    // between -1 and +1
    var value = parseFloat(sliderVal);

    stereoPanner.pan.value = value;
    // update output labels
    var output = document.querySelector("#balanceOutput");
    output.value = value;
  }

  fixRelativeURLs() {
    const elems = this.shadowRoot.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch, img");
    elems.forEach(e => {
      const path = e.src;
      if (path.startsWith(".")) {
        e.src = getBaseURL() + path;
      }
    });
  }
  defineListeners() {


    
    this.shadowRoot.querySelector("#play").onclick = () => {
      this.player.play();
    }

    this.shadowRoot.querySelector("#pause").onclick = () => {
      this.player.pause();
    }

    this.shadowRoot.querySelector("#avance10").onclick = () => {
      this.player.currentTime += 10;
    }

    this.shadowRoot.querySelector("#next").onclick = () => {
      if(this.playlist.length-1 > this.currentNbTrack) {
      console.log("playlist has", this.playlist.length, "tracks");
      this.player.src = this.playlist[this.currentNbTrack+1].src;
      this.currentNbTrack += 1;
      console.log("next", this.currentNbTrack);
      this.shadowRoot.querySelector(".marqueeText").textContent= this.playlist[this.currentNbTrack].name;
      }
      else{
        this.currentNbTrack = 0;
        console.log("end of playlist", this.currentNbTrack);
        this.player.src = this.playlist[this.currentNbTrack].src;
        this.shadowRoot.querySelector(".marqueeText").textContent= this.playlist[this.currentNbTrack].name;
      }
      setTimeout(() => { this.player.play(); }, 1000);
      
    }

    this.shadowRoot.querySelector("#previous").onclick = () => {
      if(this.currentNbTrack === 0) {
        this.currentNbTrack = this.playlist.length-1;
      this.player.src = this.playlist[this.currentNbTrack].src;
      this.shadowRoot.querySelector(".marqueeText").textContent= this.playlist[this.currentNbTrack].name;
      }
      else{
        this.currentNbTrack -= 1;
        this.player.src = this.playlist[this.currentNbTrack].src;
        this.shadowRoot.querySelector(".marqueeText").textContent= this.playlist[this.currentNbTrack].name;
      }
      setTimeout(() => { this.player.play(); }, 1000);
      
    }


    this.shadowRoot.querySelector("#sliderSpeed").oninput = (event) => {
      this.player.playbackRate = parseFloat(event.target.value);
      console.log("vitesse =  " + this.player.playbackRate);
    }

    this.shadowRoot.querySelector("#volumeKnob").oninput = (event) => {
      this.player.volume = parseFloat(event.target.value);
      console.log("volume =  " + this.player.volume);
    }

    this.shadowRoot.querySelector("#volumeKnob").oninput = (event) => {
      this.player.volume = parseFloat(event.target.value);
      console.log("volume =  " + this.player.volume);
    }

    const timeline =this.shadowRoot.querySelector(".timeline")
    timeline.onclick = (event) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = event.offsetX / parseInt(timelineWidth) * this.player.duration;
      this.player.currentTime = timeToSeek;
    };


  }


  // L'API du Web Component

}

customElements.define("my-player", MyAudioPlayer);
