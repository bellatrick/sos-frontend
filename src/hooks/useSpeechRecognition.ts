import { useState, useEffect, SetStateAction } from "react";

// A custom hook that uses SpeechRecognition API
const useSpeechRecognition = () => {
  // A state variable that stores the recognized text
  const [transcript, setTranscript] = useState("");

  const [listening, setListening] = useState(false);

  const [error, setError] = useState("");

  // A function that creates an instance of SpeechRecognition
  const initSpeechRecognition = () => {
    // Check if SpeechRecognition is supported by browser
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported by this browser.");
      return;
    }

    // Create an instance of SpeechRecognition
    const speechRecognition = new ( window as any).webkitSpeechRecognition();

    // Set some properties for speech recognition
    speechRecognition.continuous = true; // Keep listening until stopped
    speechRecognition.interimResults = true; // Show interim results
    speechRecognition.lang = "en-US"; // Set language

    // Define event handlers for speech recognition

    // When speech recognition starts
    speechRecognition.onstart = () => {
      setListening(true);
      setError("");
    };

    // When speech recognition stops
    speechRecognition.onend = () => {
      setListening(false);
    };

    // When speech recognition returns results
    speechRecognition.onresult = (event: { resultIndex: any; results: string | any[]; }) => {
      let interimTranscript = "";
      let finalTranscript = "";

      // Loop through results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Get transcript of current result
        let transcript = event.results[i][0].transcript;

        //
        if (event.results[i].isFinal) {
          // Add transcript to final transcript
          finalTranscript += transcript;
        } else {
          // Add transcript to interim transcript
          interimTranscript += transcript;
        }
      }

      // Set transcript state variables
      setTranscript(finalTranscript + interimTranscript);
    };

    // When speech recognition returns an error
    speechRecognition.onerror = (event: { error: SetStateAction<string>; }) => {
      setError(event.error);
    };

    // Return the speech recognition instance
    return speechRecognition;
  };
  const startListening = () => {
    // Initialize speech recognition
    const speechRecognition = initSpeechRecognition();

    // Check if speech recognition is available
    if (speechRecognition) {
      // Start speech recognition
      speechRecognition.start();
    }
  };
  const stopListening = () => {
    // Initialize speech recognition
    const speechRecognition = initSpeechRecognition();

    // Check if speech recognition is available and active
    if (speechRecognition && listening) {
      // Stop speech recognition
      speechRecognition.stop();
    }
  };
  const resetTranscript = () => {
    setTranscript("");
  };

  // Return the custom hook values and functions
  return {
    transcript,
    listening,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;
