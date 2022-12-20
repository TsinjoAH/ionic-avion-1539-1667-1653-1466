import React, {useRef} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons, IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonModal,
    IonPage,
    IonTitle,
    IonToolbar, useIonAlert
} from '@ionic/react';

import {login} from "../../data/login.service";
import {Redirect} from "react-router-dom";
import SpinnerProgress from "../../components/spinner/SpinnerProgress";
import './Login.css';

function Login() {


    const dismissBtn = useRef<HTMLIonButtonElement>(null);
    const modal = useRef<HTMLIonModalElement>(null);

    const [presentAlert] = useIonAlert();

    const [data, updateData] = React.useState({
        login: '',
        password: ''
    });

    const [redirect, setRedirect] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        modal.current?.present();
        login(data, () => {
            console.log('login success');
            modal.current?.dismiss().then(() => {
                setRedirect(true);
            });
        }, (m) => {
            modal.current?.dismiss().then (() => {
                presentAlert({
                    header: 'Erreur',
                    message: m
                })
            });
        });
    }

    const handleChange  = (event: any) => {
        updateData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    return (
        redirect ?
        <Redirect to="/Planes" /> :
        <IonPage>
            <IonHeader>
                <IonToolbar className="ion-text-center">
                    <IonButtons slot="start">
                        <IonBackButton text="Veuillez vous identifier" defaultHref="/Planes"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonModal ref={modal} className="modal" >
                    <SpinnerProgress className="vertical-center" />
                </IonModal>
                <form className="ion-padding" onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput name="login" value={data.login} onIonChange={handleChange} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput name="password" value={data.password} onIonChange={handleChange} type="password" />
                    </IonItem>
                    <br/>
                    <IonButton className="ion-margin-top" type="submit" expand="block">
                        Login
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default Login;