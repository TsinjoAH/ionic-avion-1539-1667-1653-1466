import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonList,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Menu, MenuItem} from "./MenuItem";
import {menuItems} from "./_menu";

function Layout(props: {
    title: string,
    render: () => JSX.Element
}): JSX.Element {

    const {render, title} = props;
    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonList>
                        {menuItems.map((menu: Menu, index) => ( <MenuItem key={index} menu={menu} /> ))}
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {render()}
                </IonContent>
            </IonPage>
        </>
    );
}

export default Layout;