import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CandidateContext } from '../context/candidateContext';
import { Link } from 'react-router-dom';

function CandidateDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { setCandidateData, candidateData, setSingleData } =
    useContext(CandidateContext);

  useEffect(() => {
    const fetchCandidate = async () => {
      const res = await axios.get(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id.toString()}`
      );
      setData(res.data);
      setSingleData(res.data);
      setIsLoading(false);
    };

    fetchCandidate();
    // eslint-disable-next-line
  }, [id]);

  const image = function () {
    if (
      !data.profile_picture ||
      data.profile_picture === 'string url of image'
    ) {
      return 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png';
    } else {
      return data.profile_picture;
    }
  };

  const handleDelete = async function (event) {
    setIsDeleting(true);

    await axios
      .delete(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}/`)
      .then(() => {
        navigate('/');
        setCandidateData(
          candidateData.filter((candidate) => candidate.id !== id)
        );
        setIsDeleting(false);
        alert(`candidate ${id} deleted`);
      });
  };

  return (
    <div>
      {isLoading ? (
        <h2>Loading Candidate Deatils....</h2>
      ) : isDeleting ? (
        <h2 className="mt-4">Deleting Candidate Details......</h2>
      ) : (
        <div className="row">
          <div className="d-flex justify-content-between my-2">
            <h2>1: Personal Details</h2>
            <div className="d-flex gap-4">
              <Link
                to={`/candidate/${id}/edit`}
                type="button"
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
          <hr />
          <div className="col-4 mx-auto">
            <div className="card mb-4">
              <div className="card-body text-center">
                {
                  <img
                    src={image()}
                    alt="avatar"
                    className="rounded-circle img-thumbnail"
                  />
                }
                <h5 className="fw-bold fs-3 my-3">
                  {data.name ? data.name : 'Not specified'}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="fw-semibold mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="mb-0">
                      {data.name ? data.name : 'Not specified'}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="fw-semibold mb-0">Email-ID</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="mb-0">
                      {data.email ? data.email : 'Not specified'}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="fw-semibold mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="mb-0">
                      {data.gender ? data.gender : 'Not specified'}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="fw-semibold mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="mb-0">{data.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="fw-semibold mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="mb-0">{data.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-start align-items-center mb-2 gap-2">
                    <h4 className="text-primary">Hobbies:</h4>
                    {data.hobbies?.map((hobby, i) => {
                      return (
                        <button
                          type="button"
                          className="btn btn-outline-primary me-1"
                          key={i}
                        >
                          {hobby}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="card p-3 my-4">
              <h3 className="mt-2">2: Educational Details</h3>
              <hr />
              {data.education?.map((el, i) => {
                return (
                  <div key={i} className="row">
                    <div className="col-6 d-flex justify-content-between align-items-center border">
                      <p className="fw-semibold pt-3">
                        Name of School / College / Institute
                      </p>
                      {el.institute ? el.institute : 'Not specified'}
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items-center border ">
                      <p className="fw-semibold pt-3">Year of Graduation</p>
                      {el.pass_out_year ? el.pass_out_year : 'Not specified'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card p-3">
              <h3 className="mt-2 ">3: Skills</h3>
              <hr />
              {data.skills?.map((skill, i) => {
                return (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center p-2 border"
                  >
                    <div>
                      <span className="fw-semibold">Skill Name:</span>{' '}
                      {typeof skill === 'string'
                        ? skill
                        : skill.name
                        ? skill.name
                        : 'Not specified'}
                    </div>
                    <div>
                      <span className="fw-semibold">Skill Experience:</span>{' '}
                      {skill.experience ? skill.experience + ' months' : 'none'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card p-3 mt-3">
              <h3 className="mt-2">4: Experience</h3>
              <hr />
              {data.experience &&
                typeof data.experience !== 'number' &&
                data.experience.map((org, i) => {
                  return (
                    <div className="card p-2 my-2" key={i}>
                      <div className="row">
                        <p className="col-8">
                          <span className="fw-semibold">
                            Name of the Company:
                          </span>{' '}
                          {org.company ? org.company : 'not specified'}
                        </p>
                        <p className="col-4">
                          <span className="fw-semibold">
                            Name of the project:
                          </span>{' '}
                          {org.project ? org.project : 'not specified'}
                        </p>
                      </div>
                      <div className="row">
                        <p className="col-8">
                          <span className="fw-semibold">Duration range:</span>{' '}
                          {org.duration_from
                            ? org.duration_from
                            : 'not specified'}{' '}
                          -{' '}
                          {org.duration_to ? org.duration_to : 'not specified'}
                        </p>
                        <p className="col-4">
                          <span className="fw-semibold">Role:</span>{' '}
                          {org.role ? org.role : 'not specified'}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateDetail;
