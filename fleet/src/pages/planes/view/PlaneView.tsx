import React, {useRef, useState} from 'react';
import {
    IonBackButton, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon, IonInput,
    IonItem,
    IonLabel, IonModal,
    IonPage, IonTitle,
    IonToolbar, useIonAlert,
    useIonViewWillEnter,
} from '@ionic/react';
import {airplane, car} from 'ionicons/icons';
import { useParams } from 'react-router';
import {getPlane, Plane, refreshPlanes, updateImg} from "../../../data/plane.service";
import "./PlaneView.css";
import {OverlayEventDetail} from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import SpinnerProgress from "../../../components/spinner/SpinnerProgress";

function ViewPlane() {

    const [plane, setPlane] = useState<Plane>();
    const [preview, setPreview] = useState<any>();
    const modalLoading = useRef<HTMLIonModalElement>(null);
    const [presentAlert] = useIonAlert();
    const params = useParams<{ id: string }>();
    const modal = useRef<HTMLIonModalElement>(null);

    useIonViewWillEnter(() => {
        getPlane(parseInt(params.id, 10), setPlane);
    });

    function cancel () {
        modal.current?.dismiss();
        setPreview(undefined)
    }

    const confirm = () => {
        modalLoading.current?.present().then(() => {
            updateImg(plane?.id, preview)
            .then((res) => {
                modalLoading.current?.dismiss().then(() => {
                    setPlane(res?.data.data as Plane)
                    modal.current?.dismiss().then(() => {
                        refreshPlanes();
                    });
                });
            })
        })
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {

        }
    }

    const setImage = (e: any) => {
        let file = e.target.files![0];
        let name = file.name;
        let extensions = ['.jpg', '.jpeg', '.png'];
        let accept = false;
        for (let ext of extensions) {
            if (name.endsWith(ext)) {
                accept = true;
                break;
            }
        }
        if (!accept) {
            presentAlert({
                header: 'Veuillez selectionnez des images',
                message: 'Les images doivent être au format .jpg, .jpeg ou .png',
                buttons: ['OK']
            }).then(() => {
                setPreview(undefined);
            });
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result);
        }
    }


    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Liste des avions" defaultHref="/planes"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {plane ? (
                    <div>
                        <IonCard>
                            <img src={plane.imgBase64} width="100%" />
                            <IonCardHeader>
                                <IonCardSubtitle>Profil avion</IonCardSubtitle>
                                <IonCardTitle>
                                    <span className="m-left">{plane.licensePlate}</span>
                                </IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonItem>
                                    <IonButton id="open-modal" expand="block">
                                        {plane.imgBase64 ? "Changer l'image" : "Ajoutez un image"}
                                    </IonButton>
                                    <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                                        <IonHeader>
                                            <IonToolbar>
                                                <IonButtons slot="start">
                                                    <IonButton onClick={() => cancel()}>Cancel</IonButton>
                                                </IonButtons>
                                                <IonButtons slot="end">
                                                    <IonButton strong={true} onClick={() => confirm()}>
                                                        Confirm
                                                    </IonButton>
                                                </IonButtons>
                                            </IonToolbar>
                                        </IonHeader>
                                        <IonContent className="ion-padding">
                                            <IonModal ref={modalLoading} className="modal" >
                                                <SpinnerProgress className="vertical-center" />
                                            </IonModal>
                                            <br/>
                                            <label htmlFor="input-file" className="lbl-button" >Selectionnez un image</label>
                                            <input id="input-file" type="file" className="d-none" onChange={setImage} />
                                            <br/><br/>
                                            { preview ? <img className="img-preview" src={preview} width="100%" alt=""/>  : "" }
                                        </IonContent>
                                    </IonModal>
                                </IonItem>
                                <IonItem >
                                    <u>Kilometrage</u> <span className="m-left">{plane.currentKm ?? 0} km </span>
                                </IonItem>
                                <IonItem >
                                    <u>Assurance Debut:</u> <span className="m-left">{plane.begin_assurance?.toString() ?? "Non assure"}</span> <br/>
                                </IonItem>
                                <IonItem>
                                    <u>Expiration Assurance:</u> <span className="m-left">{plane.end_assurance?.toString() ?? "Non assure"}</span><br/>
                                </IonItem>
                                <div className="m-top ion-padding ion-color-dark">
                                    <span>Liste Kilometrage</span>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Kilometrage</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            plane.kmList.length > 0 ? (
                                                <tr>
                                                    <td>{plane.kmList[0].date.toString()}</td>
                                                    <td>{plane.kmList[0].start} km</td>
                                                </tr>
                                            ) : (
                                                <tr>
                                                    <td colSpan={2} >Aucun kilometrage</td>
                                                </tr>
                                            )
                                        }
                                        {plane.kmList.map((km, index) =>
                                            <tr key={index}>
                                                <td>{km.date.toString()}</td>
                                                <td>{km.end} km</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </div>
                ) : (
                    <div>Plane not found</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default ViewPlane;
