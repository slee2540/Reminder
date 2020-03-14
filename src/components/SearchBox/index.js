import React from 'react';
import css from './searchbox.module.css';

const SearchBox = () => {
  return (
    <>
      <input type="text" placeholder="Search..." className={css.wrapper} />
    </>
  );
};

export default SearchBox;
