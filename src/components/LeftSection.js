import CandidatesList from './CandidatesList';

import { Link } from 'react-router-dom';

function LeftSection() {
  return (
    <div className="col-4 border">
      <div className="d-flex justify-content-between align-items-center px-2 my-2">
        <h5>Candidate List</h5>
        <Link to="/candidate/new" type="button" className="btn btn-success">
          ADD
        </Link>
      </div>
      <CandidatesList />
    </div>
  );
}

export default LeftSection;
