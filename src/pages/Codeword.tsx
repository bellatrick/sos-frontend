import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import { addItemToLocalStorage } from "../helperfunctions";
type props = {
  codeWord: string;
  setCodeWord: any;
};

const CodeWord = ({ codeWord, setCodeWord }: props) => {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [toastMessage, setToastMessage] = useState<any>("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    if (inputValue) {
      setCodeWord(inputValue);
      addItemToLocalStorage(inputValue, "code_word");
      setToastMessage("Code word saved.");

      // Clear the input value state variable
      setInputValue("");
    } else {
      // Set the toast message state variable
      setToastMessage("Please enter a code word.");
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Code Word Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-content">
        <div className="ion-wrapper">
          <div>
            <p>
              Enter a code word that will trigger an SOS alert when you say it.
            </p>
            <IonInput
              value={inputValue}
              placeholder="Enter code word"
              onIonChange={handleChange}
            />
            <IonButton expand="block" onClick={handleClick}>
              Save Code Word
            </IonButton>
            {codeWord && <p>Your current code word is: {codeWord}</p>}
            <IonToast
              isOpen={toastMessage}
              onDidDismiss={() => setToastMessage("")}
              message={toastMessage}
              duration={2000}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CodeWord;
