x = 0;
y = 0;
apple = "";
draw_apple = "";
to_number = 0;

function preload() {
  apple = loadImage("apple.png");
}


var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;
  to_number = Number(content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  if (Number.isInteger(to_number)) {
    
    document.getElementById("status").innerHTML = "Started Drawing apple";
    draw_apple = "set";
  }
}

function setup() {
  canvas = createCanvas(900, 600);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    for (let i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
    y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    speak();
    draw_apple = "";
  }
}

function speak() {
  var synth = window.speechSynthesis;
  speak_data = to_number + " Apples drawn";
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}
