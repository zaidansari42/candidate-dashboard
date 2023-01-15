import { createContext, useState } from 'react';

export const CandidateContext = createContext();

export const CandidateContextProvider = ({ children }) => {
  const [candidateData, setCandidateData] = useState();
  const [singleData, setSingleData] = useState();

  return (
    <CandidateContext.Provider
      value={{ candidateData, setCandidateData, singleData, setSingleData }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
