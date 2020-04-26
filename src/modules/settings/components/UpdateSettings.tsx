import React from 'react';
import { useForm } from 'react-hook-form';

import { QUESTIONS } from '../constants';

export const UpdateSettings = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  return (
    <form>
      {QUESTIONS.map(({ question, answerPositive, answerNegative, label }) => (
        <div key={label}>
          {question}
          <div>
            <label>{answerPositive}</label>
          </div>
          <div>
            <label>{answerNegative}</label>
          </div>
        </div>
      ))}
    </form>
  );
};
