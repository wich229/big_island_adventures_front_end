import SecNav from "./SecNav";
import { Card } from "react-bootstrap";

const EventCardMoreInfo = ({tour}) =>{
    const page = "tour"
    return(
        <section>
            <section>
                <SecNav page={page}/>
            </section>
            <section>
                <Card>{tour.name}</Card>
            </section>
        </section>
    )  
}

export default EventCardMoreInfo;