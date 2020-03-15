import React from 'react';
import SearchBox from 'components/SearchBox';
import List from 'components/List';
import Task from 'components/Task';
import css from './app.module.css';

function App() {
  return (
    <div className={css.wrapper}>
      <div className={css.leftWrapper}>
        <SearchBox />
        <List />
      </div>
      <div className={css.rightWrapper}>
        <Task />
      </div>
    </div>
  );
}

export default App;
