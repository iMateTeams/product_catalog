import React from 'react';
import s from './AuthPopup.module.scss';

export const AuthPopup: React.FC = () => {
  return (
    <>
      <div className={s.blender}>
      </div>

      <div className={s.auth_popup}>
        <h1 className={s.auth_popup__title}>
          Register
        </h1>
      </div>    
    </>
  );
};