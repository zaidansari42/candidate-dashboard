import { Route, Routes } from 'react-router-dom';

import CandidateDetail from './CandidateDetail';
import BlankHome from './BlankHome';
import { useEffect } from 'react';

import NewForm from './NewForm';
import EditForm from './EditForm';

import './overflow-scroll.css';

function RightSection() {
  useEffect(() => {
    document.querySelector('#main').scrollTo(0, 0);
  });

  return (
    <div className="col-8 border scroll-yr" id="main">
      <Routes>
        <Route path="/" element={<BlankHome />} />
        <Route path="/candidate/new" element={<NewForm />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        <Route path="/candidate/:id/edit" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default RightSection;
