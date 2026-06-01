import { useParams } from "react-router-dom";
import FestivalConfigurator from "../components/festivalDashboard/FestivalConfigurator";
import FestivalSimulations from "../components/festivalDashboard/FestivalSimulations";
import FestivalMetrics from "../components/festivalDashboard/FestivalMetrics";
import { useAuth } from "../auth/AuthProvider";
import Banner from "../components/banner/Banner";
import "./FestivalDashboard.css"
import { useFestival } from "../hooks/useFestival";
import FestivalActions from "../components/festivalDashboard/FestivalActions";
import FestivalFinance from "../components/festivalDashboard/FestivalFinance";

export default function FestivalDashboard() {
    const { user, updateUser } = useAuth();
    const { id } = useParams();

    const {festival, error, setError, success, resetSuccess, updateField, saveFestival, runSimulation, actions} = useFestival(user, id, updateUser)

    if (error && !festival) {
        return <Banner message={error} success={false} closeBanner={() => setError(null)} />
    }

    if (!festival) {
        return <div>Loading...</div>;
    }

    return (
        <section className="FestivalDashboard">

            {error && <Banner message={error} success={false} closeBanner={() => setError(null)} />}
            {success && <Banner message={success} success={true} closeBanner={resetSuccess} />}

            <article className="FestivalLeft">
                <FestivalConfigurator 
                    festival={festival} 
                    updateField={updateField}
                    saveFestival={saveFestival}
                    artistFns={actions.artistFns}
                    stagesFns={actions.stagesFns}
                    vendorFns={actions.vendorFns}
                    staffFns={actions.staffFn}
                />
            </article>

            <article className="FestivalRight">
                <div className="FestivalData">
                    <FestivalSimulations festival={festival}/>
                    <FestivalFinance festival={festival}/>
                    <FestivalMetrics festival={festival}/>
                </div>
                <FestivalActions festival={festival} runSimulation={runSimulation}/>
            </article>
        </section>
    );
}