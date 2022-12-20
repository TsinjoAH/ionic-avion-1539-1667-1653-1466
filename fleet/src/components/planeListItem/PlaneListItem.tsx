import {Plane} from "../../data/plane.service";
import {IonItem, IonLabel} from "@ionic/react";

interface PlaneListItemProps {
    Plane: Plane;
}

export const PlaneListItem: React.FC<PlaneListItemProps> = ({ Plane }) => {
    return (
        <IonItem routerLink={`/planes/${Plane.id}`} detail={false}>
            <div slot="start" className="dot dot-unread"></div>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {Plane.licensePlate}
                </h2>
            </IonLabel>
        </IonItem>
    );
}

