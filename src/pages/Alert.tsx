
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonLoading,
} from "@ionic/react";

// A component that renders a screen for alerts
type props = {
  loading: boolean;
  success: boolean;
};
const Alerts = ({ loading, success }: props) => {
  // Return the JSX element for the component
  return (
    <IonPage>
      <IonContent className="ion-content">
        <div className="ion-wrapper">
          <div>
            {loading && (
              <IonLoading
                isOpen={loading}
                message={"Sending SOS..."}
                duration={3000}
              />
            )}
            {success && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>SOS alerts sent successfully!</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Your emergency contacts have been notified.</p>
                  <p>Stay calm and wait for help.</p>
                </IonCardContent>
              </IonCard>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Alerts;
