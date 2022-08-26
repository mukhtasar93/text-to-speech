const textArea = document.querySelector("#text");
let voiceList = document.querySelector("#voice");
let speechButton = document.querySelector("#convert");

let synth = speechSynthesis;
let isSpeaking = true;

function voiceSpeech() {
	for (let voice of synth.getVoices()) {
		let option = document.createElement("option");
		option.text = voice.name;
		voiceList.addEventListener(option);
		console.log(option);
	}
}

synth.addEventListener("voiceschanged", voiceSpeech);

function textToSpeech(text) {
	let utternance = new SpeechSynthesisUtterance(text);
	for (let voice of synth.getVoices()) {
		if (voice.name === voiceList.value) {
			utternance.voice = voice;
		}
	}
	speechSynthesis.speak(utternance);
}

speechButton.addEventListener("click", (e) => {
	e.preventDefault();
	if (textArea.value != "") {
		if (!synth.speaking) {
			textToSpeech(textArea.value);
		}
		if (textArea.value > 80) {
			if (isSpeaking) {
				synth.resume();
				isSpeaking = false;
				speechButton.innerHTML = "Pause Speech";
			} else {
				synth.pause();
				isSpeaking = true;
				speechButton.innerHTML = "Resume Speech";
			}
			setInterval(() => {
				if (!synth.speaking && isSpeaking) {
					isSpeaking = true;
					speechButton.innerHTML = "Convert To Speech";
				}
			});
		} else {
			speechButton.innerHTML = "Convert To Speech";
		}
	}
});
