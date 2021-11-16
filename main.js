Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

function capture()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5FQepWIhK/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      document.getElementById("hand_guesture_name").innerHTML = results[0].label;
      speak();
      if(results[0].label == "hand1")
      {
        document.getElementById("update_emoji").innerHTML = "&#128522;";
      }
      if(results[0].label == "hand2")
      {
        document.getElementById("update_emoji").innerHTML = "&#128532;";
      }
      if(results[0].label == "hand3")
      {
        document.getElementById("update_emoji").innerHTML = "&#128548;";
      }
  
      if(results[1].label == "hand4")
      {
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
      }
      if(results[1].label == "hand5")
      {
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
      }
    }
  }
  function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = results[0].label;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
  }