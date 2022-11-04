import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  {tuit: "NASA tuit",postedBy:'nasa', _id:"633b12c1f77b271b3fba92e7"},
  {tuit: "hello trial",postedBy:'alice123',  _id:"6348cd2257afe6220ceba2be"},
  {tuit: "using new post",postedBy:'ellenripley',  _id:"63629bc35eb31a7909e95da0"}
];

// test tuit list renders static tuit array
test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const linkElementA = screen.getByText(/NASA tuit/i);
  const linkElementB = screen.getByText(/hello trial/i);
  const linkElementC = screen.getByText(/using new post/i);
  expect(linkElementA).toBeInTheDocument();
  expect(linkElementB).toBeInTheDocument();
  expect(linkElementC).toBeInTheDocument();
});


test('tuits list renders mocked', async () => {
  axios.get.mockImplementation(() =>
  Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/hello/i);
  expect(tuit).toBeInTheDocument();
});

