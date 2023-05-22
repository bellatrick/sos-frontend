import { Redirect, Route, useHistory } from "react-router-dom";

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Codeword from "./pages/Codeword";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Contacts from "./pages/Contact";
import { code, list, micCircle } from "ionicons/icons";
import { useState } from "react";
import useGeolocation from "./hooks/useGeolocation";
import Alerts from "./pages/Alert";
import VoiceInput from "./components/VoiceInput";
import { sendSOS } from "./apiFunctions";
import { getItemsFromLocalStorage } from "./helperfunctions";

setupIonicReact();

const App: React.FC = () => {
  const storedContacts = getItemsFromLocalStorage("contacts");
  const storedCodeWord = getItemsFromLocalStorage("code_word");
  const storedUsername = getItemsFromLocalStorage("username");
  const [codeWord, setCodeWord] = useState(storedCodeWord);

  const [contacts, setContacts] = useState<string[]>(storedContacts);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(storedUsername);
  const { location } = useGeolocation();
  const history = useHistory();
  // A function that triggers an SOS alert when code word is detected
  const handleAlert = async () => {
    if (contacts.length > 0 && location.latitude && location.longitude) {
      try {
        setLoading(true);

        await sendSOS(contacts, location,username);
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/voice_input">
              <VoiceInput codeWord={codeWord} onAlert={handleAlert} />
            </Route>
            <Route path="/contacts">
              <Contacts
                username={username}
                setUsername={setUsername}
                contacts={contacts}
                setContacts={setContacts}
              />
            </Route>
            <Route path="/alerts">
              <Alerts loading={loading} success={success} />
            </Route>

            <Route path="/codeword">
              <Codeword codeWord={codeWord} setCodeWord={setCodeWord} />
            </Route>
            <Redirect exact from="/" to="/contacts" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="contacts" href="/contacts">
              <IonIcon icon={list} />
              <IonLabel>Contacts</IonLabel>
            </IonTabButton>
            <IonTabButton tab="codeword" href="/codeword">
              <IonIcon icon={code} />
              <IonLabel>Codeword</IonLabel>
            </IonTabButton>
            <IonTabButton tab="voice" href="/voice_input">
              <IonIcon icon={micCircle} />
              <IonLabel>Listen</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
