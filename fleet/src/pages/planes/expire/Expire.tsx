import {useEffect, useState} from 'react';
import {getPlanesExpiredIn, Plane} from "../../../data/plane.service";
import {useParams} from "react-router";
import Layout from "../../../components/layout/Layout";
import PlaneList from "../../../components/planeList/PlaneList";

const Expire: React.FC = () => {

    const [Planes, setPlanes] = useState<Plane[]>([]);
    const params = useParams<{ month: string }>();

    useEffect(() => {
        let month = parseInt(params.month, 10);
        console.log(month);
        getPlanesExpiredIn(month, setPlanes);
    }, [params.month]);

    return (
        <Layout
            render={() => (
                <PlaneList Planes={Planes} />
            )}
            title={`Expire dans ${params.month} mois`}
        ></Layout>
    );
};

export default Expire;


