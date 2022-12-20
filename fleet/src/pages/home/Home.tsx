import React, {useRef, useState} from 'react';
import {
    IonModal,
    IonRefresher, IonRefresherContent,
    useIonViewDidEnter,
    useIonViewWillEnter
} from '@ionic/react';
import PlaneList from "../../components/planeList/PlaneList";
import {getPlanes, refreshPlanes, Plane} from "../../data/plane.service";
import Layout from "../../components/layout/Layout";
import SpinnerProgress from "../../components/spinner/SpinnerProgress";

const Home: () => JSX.Element = () => {

    const [planes, setPlanes] = useState<Plane[]>([]);
    const refresher = useRef<HTMLIonRefresherElement>();
    const modal = useRef<HTMLIonModalElement>(null);

    useIonViewWillEnter(() => {
        if (!localStorage.getItem("planes")) {
            modal.current?.present().then(() => {
                getPlanes((data) =>  {
                    modal.current?.dismiss().then(() => {
                        setPlanes(data);
                    })
                });
            });
        }
        else {
            getPlanes(setPlanes);
        }
    });

    const refresh = (e: CustomEvent) => {
        refreshPlanes().then((data) => {
            setPlanes(data);
            e.detail.complete();
        });
    }

    return (
        <Layout
            render={() => (
                <>
                    <IonRefresher slot="fixed" onIonRefresh={refresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                    <IonModal ref={modal} className="modal" >
                        <SpinnerProgress className="vertical-center" />
                    </IonModal>
                    <PlaneList Planes={planes}/>
                </>
            )}
            title={"Liste des avions"}
        ></Layout>
    );
};

export default Home;
