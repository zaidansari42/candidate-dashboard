import { Link } from 'react-router-dom';

function Candidate({ details }) {
  return (
    <li className="list-group-item mx-2 py-2">
      <Link
        to={`/candidate/${details.id}`}
        className="text-decoration-none d-block"
      >
        {details.name ? details.name : 'Name not assigned'}
      </Link>
    </li>
  );
}

export default Candidate;
