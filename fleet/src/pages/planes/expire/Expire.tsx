import React, {useEffect, useRef, useState} from 'react';
import {getPlanesExpiredIn, Plane} from "../../../data/plane.service";
import {useParams} from "react-router";
import Layout from "../../../components/layout/Layout";
import PlaneList from "../../../components/planeList/PlaneList";
import SpinnerProgress from "../../../components/spinner/SpinnerProgress";
import {IonModal} from "@ionic/react";

const Expire: React.FC = () => {

    const [Planes, setPlanes] = useState<Plane[]>([]);
    const modal = useRef<HTMLIonModalElement>(null);
    const params = useParams<{ month: string }>();

    useEffect(() => {
        let month = parseInt(params.month, 10);
        modal.current?.present().then(() => {
            getPlanesExpiredIn(month, (list) => {
                modal.current?.dismiss().then(() => {
                    setPlanes(list);
                });
            });
        });
    }, [params.month]);

    return (
        <Layout
            render={() => (
                <>
                    <PlaneList Planes={Planes}/>
                    <IonModal ref={modal} className="modal">
                        <SpinnerProgress className="vertical-center"/>
                    </IonModal>
                </>
            )}
            title={`Expire dans ${params.month} mois`}
        ></Layout>
    );
};

export default Expire;


