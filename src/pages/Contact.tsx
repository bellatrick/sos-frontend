import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
import {
  addItemToLocalStorage,
  getItemsFromLocalStorage,
  removeItemFromLocalStorage,
} from "../helperfunctions";

type props = {
  contacts: string[];
  setContacts: any;
  setUsername: any;
  username: string;
};

const Contacts = ({ contacts, setContacts, username, setUsername }: props) => {
  const [inputValue, setInputValue] = useState("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAdd = () => {
    if (inputValue) {
      const phoneRegex = /^\+\d{1,14}$/;
      if (phoneRegex.test(inputValue)) {
        if (contacts.length < 5) {
          setContacts([...contacts, inputValue]);
          addItemToLocalStorage(inputValue, "contacts");

          setInputValue("");
        } else {
          setAlertMessage("You can only have up to 5 contacts.");
        }
      } else {
        setAlertMessage("Please enter a valid phone number.");
      }
    } else {
      setAlertMessage("Please enter a phone number.");
    }
  };

  const handleDelete = (index: any) => {
    setContacts(contacts.filter((contact, i) => i !== index));
    removeItemFromLocalStorage(index, "contacts");
  };
  const handleSaveUsername = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addItemToLocalStorage(username, "username");
    setShowInput(false);
  };
  // Return the JSX element for the component
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome! {username || ""} Emergency Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="username_wrapper">
        {showInput ? (
          <form onSubmit={handleSaveUsername}>
            <IonInput
              value={username}
              placeholder="Enter Your username"
              onIonChange={(e) => setUsername(e.target.value)}
            />
          </form>
        ) : (
          <IonButton
            className="input-button"
            slot="end"
            onClick={() => setShowInput(true)}
          >
            <span>Edit username</span> <IonIcon icon={addOutline} />
          </IonButton>
        )}
      </div>
      <IonContent className="ion-content">
        <div className="ion-wrapper">
          <div>
            <p>Enter up to 5 phone numbers that will receive SOS alerts.</p>
            <IonItem>
              <IonLabel position="floating">Enter phone Number</IonLabel>
              <IonInput
                value={inputValue}
                placeholder="+12025551234"
                onIonChange={handleChange}
              />
              <IonButton
                className="input-button"
                slot="end"
                onClick={handleAdd}
              >
                 <IonIcon icon={addOutline} />
              </IonButton>
            </IonItem>
            {contacts.length > 0 && (
              <IonList class="ion-list">
                {contacts.map((contact, index) => (
                  <IonItem key={index}>
                    <IonLabel>{contact}</IonLabel>
                    <IonButton slot="end" onClick={() => handleDelete(index)}>
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>

          <IonAlert
            isOpen={!!alertMessage}
            onDidDismiss={() => setAlertMessage("")}
            message={alertMessage}
            buttons={["OK"]}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
