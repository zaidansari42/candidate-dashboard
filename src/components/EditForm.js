import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateContext } from '../context/candidateContext';

function EditForm() {
  const { candidateData, setCandidateData, singleData } =
    useContext(CandidateContext);

  const {
    education: edu,
    email: mail,
    experience: exp,
    gender: gen,
    hobbies: hob,
    name: nm,
    profile_picture: pp,
    skills: ss,
    id,
  } = singleData;

  const [profile_picture, setProfile_picture] = useState(pp);
  const [name, setName] = useState(nm);
  const [email, setEmail] = useState(mail);
  const [gender, setGender] = useState(gen);
  const [hobbies, setHobbies] = useState(hob);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hobbyText, setHobbyText] = useState('');

  const navigate = useNavigate();

  const [education, setEducation] = useState(edu);

  const [skills, setSkills] = useState(ss);

  const [experience, setExperience] = useState(exp);

  const onInstituteNameChange = (e, i) => {
    const updatededucation = [...education];
    updatededucation[i] = {
      ...updatededucation[i],
      institute: e.target.value,
    };

    setEducation(updatededucation);
  };

  const onInstituteYearChange = (e, i) => {
    const updatededucation = [...education];
    updatededucation[i] = {
      ...updatededucation[i],
      pass_out_year: e.target.value,
    };

    setEducation(updatededucation);
  };

  const onSkillNameChange = (e, i) => {
    const updatedSkillField = [...skills];
    updatedSkillField[i] = {
      ...updatedSkillField[i],
      name: e.target.value,
    };

    setSkills(updatedSkillField);
  };

  const onSkillYearChange = (e, i) => {
    const updatedSkillField = [...skills];
    updatedSkillField[i] = {
      ...updatedSkillField[i],
      experience: e.target.value,
    };

    setSkills(updatedSkillField);
  };

  const addeducation = function () {
    education.length < 10 &&
      setEducation([...education, { institute: '', pass_out_year: '' }]);
  };

  const addskills = function () {
    skills.length < 10 && setSkills([...skills, { name: '', experience: '' }]);
  };

  const addexperience = function () {
    experience.length < 10 &&
      setExperience([
        ...experience,
        {
          company: '',
          project: '',
          role: '',
          duration_from: '',
          duration_to: '',
        },
      ]);
  };

  const onCompanyNameChange = function (e, i) {
    const updatedExpFeild = [...experience];
    updatedExpFeild[i] = { ...updatedExpFeild[i], company: e.target.value };

    setExperience(updatedExpFeild);
  };

  const onProjectNameChange = function (e, i) {
    const updatedExpFeild = [...experience];
    updatedExpFeild[i] = { ...updatedExpFeild[i], project: e.target.value };

    setExperience(updatedExpFeild);
  };

  const onRoleNameChange = function (e, i) {
    const updatedExpFeild = [...experience];
    updatedExpFeild[i] = { ...updatedExpFeild[i], role: e.target.value };

    setExperience(updatedExpFeild);
  };

  const onDurationStartChange = function (e, i) {
    const monthNumber = Number(e.target.value.slice(-2));
    const year = e.target.value.slice(0, 4);

    const date = new Date();
    date.setMonth(monthNumber - 1);

    const monthShort = date.toLocaleString('en-us', { month: 'short' });

    const updatedExpFeild = [...experience];
    updatedExpFeild[i] = {
      ...updatedExpFeild[i],
      duration_from: `${monthShort} ${year}`,
    };

    setExperience(updatedExpFeild);
  };

  const onDurationEndChange = function (e, i) {
    const monthNumber = Number(e.target.value.slice(-2));
    const year = e.target.value.slice(0, 4);

    const date = new Date();
    date.setMonth(monthNumber - 1);

    const monthShort = date.toLocaleString('en-us', { month: 'short' });

    const updatedExpFeild = [...experience];
    updatedExpFeild[i] = {
      ...updatedExpFeild[i],
      duration_to: `${monthShort} ${year}`,
    };

    setExperience(updatedExpFeild);
  };

  const formatDate = (date) => {
    if (date?.length > 4 && !isNaN(Number(date[0]))) {
      return date;
    } else {
      const dateObj = new Date(date);
      return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const candidateDetail = {
      profile_picture,
      name,
      email,
      gender,
      hobbies,
      education,
      skills,
      experience,
    };

    setIsSubmitting(true);

    axios
      .put(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`,
        candidateDetail
      )
      .then((res) => {
        navigate(`/candidate/${res.data.id}`);

        // Testing Done
        setCandidateData(() => {
          const candidateIndex = candidateData.findIndex(
            (el) => el.id === res.data.id
          );

          candidateData[candidateIndex] = res.data;
          return candidateData;
        });
        alert('Candidate Details have been Submitted');
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
      });
  };

  const onHobbyDeleteClick = (value) => {
    setHobbies(hobbies.filter((hobby) => hobby !== value));
  };

  return (
    <div>
      {isSubmitting ? (
        <h2>Updating Candidate Details....</h2>
      ) : (
        <form>
          <div>
            {/* Step 1 Personal Deatils */}
            <div className="d-flex justify-content-between">
              <h3 className="mt-2">Step 1: Personal Details</h3>
              <button
                type="button"
                className="btn btn-danger my-2"
                onClick={() => navigate(`/candidate/${id}`)}
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Profile Picture
              </label>
              <input
                type="text"
                id="profile"
                placeholder="https://your_image_url.com"
                className="form-control"
                onChange={(event) => setProfile_picture(event.target.value)}
                value={profile_picture}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="form-control"
                aria-describedby="profileHelp"
                required
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
              <div id="profileHelp" className="form-text text-danger">
                This is Required ( * )
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@organisation.com"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <h6> Gender: </h6>
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  onChange={() => setGender('Male')}
                  id="male"
                  name="gender"
                  className="form-check-input"
                  defaultChecked={gen === 'Male'}
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  onChange={() => setGender('Female')}
                  id="female"
                  name="gender"
                  className="form-check-input"
                  defaultChecked={gen === 'Female'}
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>
            </div>
            <h6> Hobbies: </h6>
            <div className="d-flex gap-2">
              <input
                type="text"
                value={hobbyText}
                onChange={(e) => setHobbyText(e.target.value)}
                placeholder="Enter hobbies"
                className="form-control w-50"
                onKeyDown={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  if (!hobbyText) return;
                  setHobbies([...hobbies, hobbyText]);
                  setHobbyText('');
                }}
              >
                Add
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2 my-3">
              {hobbies.map((hobby, i) => (
                <div
                  key={i}
                  className="btn btn-primary d-flex align-items-center gap-2"
                >
                  {hobby}
                  <div
                    type="button"
                    onClick={() => {
                      onHobbyDeleteClick(hobby);
                    }}
                  >
                    <i class="bi bi-x-lg text-warning"></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              {/* Step 2: Educational Details */}
              <h3 className="mt-3">Step 2: Educational Details</h3>
              <button
                type="button"
                className="btn btn-info fs-1 py-0"
                onClick={addeducation}
              >
                <i class="bi bi-plus-square"></i>
              </button>
            </div>
            <hr />
            {education.map((el, i) => {
              return (
                <div key={i}>
                  <div className="mb-3">
                    <label htmlFor="education" className="form-label">
                      Name of School / College / Institute | {i + 1}
                    </label>
                    <input
                      type="text"
                      id="education"
                      placeholder="Mumbai University"
                      className="form-control"
                      name="education"
                      onChange={(e) => onInstituteNameChange(e, i)}
                      value={el?.institute}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="graduation" className="form-label">
                      Year of Graduation
                    </label>
                    <input
                      type="number"
                      id="graduation"
                      name="graduation"
                      placeholder="2019"
                      className="form-control"
                      min="1980"
                      max="2099"
                      step="1"
                      onChange={(e) => onInstituteYearChange(e, i)}
                      value={el?.pass_out_year}
                    />
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between">
              {/* Step 3: Skills */}
              <h3 className="mt-3">Step 3: Skills</h3>
              <button
                type="button"
                className="btn btn-info fs-1 py-0"
                onClick={addskills}
              >
                <i class="bi bi-plus-square"></i>
              </button>
            </div>
            <hr />
            {skills.map((el, i) => {
              return (
                <div className="row" key={i}>
                  <div className="mb-3 col-7">
                    <label htmlFor="skill" className="form-label">
                      Name of Skill | {i + 1}
                    </label>
                    <input
                      type="text"
                      id="skill"
                      placeholder="Javascript"
                      className="form-control"
                      name="skill"
                      onChange={(e) => onSkillNameChange(e, i)}
                      value={el?.name}
                    />
                  </div>
                  <div className="mb-3 col-5">
                    <label htmlFor="skillTime" className="form-label">
                      Experience
                    </label>
                    <input
                      type="number"
                      id="skillTime"
                      placeholder="9 months"
                      className="form-control"
                      name="skillTime"
                      step="1"
                      min="0"
                      onChange={(e) => onSkillYearChange(e, i)}
                      value={el?.experience}
                    />
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between">
              {/* Step 4: Experience */}
              <h3 className="mt-2">Step 4: Experience</h3>
              <button
                type="button"
                className="btn btn-info fs-1 py-0"
                onClick={addexperience}
              >
                <i class="bi bi-plus-square"></i>
              </button>
            </div>
            <hr />
            {experience.map((el, i) => {
              return (
                <div key={i}>
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">
                      Company | {i + 1}
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Non Stop IO tech Pvt Ltd"
                      className="form-control"
                      name="company"
                      onChange={(e) => onCompanyNameChange(e, i)}
                      value={el?.company}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-8">
                      <label htmlFor="project" className="form-label">
                        Project
                      </label>
                      <input
                        type="text"
                        id="project"
                        placeholder="PayTM"
                        className="form-control"
                        name="project"
                        onChange={(e) => onProjectNameChange(e, i)}
                        value={el?.project}
                      />
                    </div>
                    <div className="mb-3 col-4">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        placeholder="SDE-2"
                        className="form-control"
                        name="role"
                        onChange={(e) => onRoleNameChange(e, i)}
                        value={el?.role}
                      />
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="durationStart" className="form-label">
                        Duration Start:
                      </label>
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="month"
                            id="durationStart"
                            name="durationStart"
                            className="form-control"
                            value={formatDate(el.duration_from)}
                            onChange={(e) => onDurationStartChange(e, i)}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="month"
                            id="durationEnd"
                            name="duration"
                            className="form-control"
                            onChange={(e) => onDurationEndChange(e, i)}
                            value={formatDate(el.duration_to)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-end m-2">
              <button onClick={handleSubmit} className="btn btn-primary fs-5">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditForm;
