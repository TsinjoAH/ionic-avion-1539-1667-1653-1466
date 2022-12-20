import {IonContent, IonItem, IonList, IonPage} from '@ionic/react';
import {Plane} from "../../data/plane.service";
import {PlaneListItem} from "../planeListItem/PlaneListItem";

interface PlaneListProps {
    Planes: Plane[];
}

const PlaneList: React.FC<PlaneListProps> = ({Planes}) => {

    return (
        <IonList>
            {Planes.map(v => <PlaneListItem key={v.id} Plane={v}/>)}
            {Planes.length == 0 ? (
                <IonItem>
                    Aucun vehicule
                </IonItem>
            ): ""}
        </IonList>
    );
};

export default PlaneList;
