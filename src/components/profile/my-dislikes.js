import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
  const [dislikedTuits, setDislikedTuis] = useState([]);
  const findTuitsIDislike = () =>
    service.findTuitsUserDisliked("me")
      .then((tuits) => setDislikedTuis(tuits));
  useEffect(findTuitsIDislike, []);
  
  return(
    <div>
      <div>
        <h1>My Dislikes</h1>
        
      </div>
      <Tuits tuits={dislikedTuits}
             refreshTuits={findTuitsIDislike}/>
    </div>
  );
};
export default MyDislikes;
