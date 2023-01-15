import LeftSection from './LeftSection';
import RightSection from './RightSection';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const homeScreen = function () {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column justify-content-center main-screen">
      <button className="btn btn-dark my-1 mx-auto" onClick={homeScreen}>
        <h1 className="text-center">Home Screen</h1>
      </button>
      <div className="container-fluid row">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}

export default Home;
