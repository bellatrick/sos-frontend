import React, { useEffect, useState } from "react";

import { detectCodeWord, getItemsFromLocalStorage } from "../helperfunctions";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { micCircle } from "ionicons/icons";

// A component that captures audio input and converts it to text
type props = {
  codeWord: string;
  onAlert: () => void;
};
const VoiceInput = ({ codeWord, onAlert }: props) => {
  const storedUsername = getItemsFromLocalStorage("username");
  const [alertMessage, setAlertMessage] = useState<string>("");
  // Use the custom hook for speech recognition
  const {
    transcript,
    listening,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // A function that handles the click event of the button
  const handleClick = () => {
    onAlert();
    stopListening();
    // If speech recognition is not active
    if (!listening) {
      // Start speech recognition
      startListening();
    } else {
      // Stop speech recognition
      stopListening();
    }
  };

  const checkCodeWord = () => {
    if (!codeWord || codeWord.trim().length < 0) {
      setAlertMessage("Please enter a codeword first");
      return;
    }
    if (!storedUsername || storedUsername.length < 1) {
      setAlertMessage("Please create a username first");
      return;
    }

    // if (transcript && detectCodeWord(transcript, codeWord)) {
    //   stopListening();
    //   resetTranscript();
    //   onAlert();
    // }
  };

  useEffect(() => {
    checkCodeWord();
  }, [transcript]);

  // Return the JSX element for the component
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Voice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-content">
        <div className="ion-wrapper">
          <div className="voice-input">
            <div>
              <button onClick={handleClick} className="listen">
                <IonIcon className="mic" icon={micCircle} />
              </button>
              <p className=""> {listening ? "Stop" : "Start"} Listening</p>
            </div>

            {error && <p className="error">{error}</p>}

            {transcript && <p className="transcript">{transcript}</p>}
          </div>
        </div>
        <IonAlert
          isOpen={!!alertMessage}
          onDidDismiss={() => setAlertMessage("")}
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default VoiceInput;
