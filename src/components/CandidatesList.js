import axios from 'axios';

import { useContext, useEffect, useState } from 'react';
import { CandidateContext } from '../context/candidateContext';

import Candidate from './Candidate';

import './overflow-scroll.css';

function CandidatesList() {
  const { candidateData, setCandidateData } = useContext(CandidateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async function () {
      const response = await axios.get(
        'https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
      );

      setCandidateData(response.data);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="border scroll-y">
      <ul className="list-group my-1">
        {loading ? (
          <p className="display-4">Loading Data...</p>
        ) : (
          candidateData.map((detail) => (
            <Candidate details={detail} key={detail.id} />
          ))
        )}
      </ul>
    </div>
  );
}

export default CandidatesList;
