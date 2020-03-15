import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {addTask} from 'store/List/actions';
import shortid from 'shortid';
import css from './task.module.css';

const Task = () => {
  const [task, setTask] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState({
    num: '',
    text: '',
    newText: '',
  });

  const dispatch = useDispatch();
  const propsTask = useSelector(state => state.list.task);
  const list = useSelector(state => state.list.list);
  const selectedList = useSelector(state => state.list.selectedList);

  useEffect(() => {
    const filterTask = [];

    if (list.length === 0) {
      setTask([]);
    }

    if (propsTask.length > 0) {
      if (selectedList >= list.length) return setTask(filterTask);
      if (selectedList === '') return setTask(filterTask);

      propsTask.forEach(item => {
        if (item.list === list[selectedList].id) filterTask.push(item);
      });

      setTask(filterTask);
    }
  }, [list, propsTask, selectedList]);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleKeyPress = type => e => {
    if (e.key === 'Enter') {
      if (selectedList === '') {
        alert('한개의 List를 수정 버튼을 눌러주신 후 Task 추가를 해주세요.');
        return;
      }

      let newTask;
      if (type === 'new') {
        newTask = [
          ...propsTask,
          {
            id: shortid.generate(),
            list: list[selectedList].id,
            name: value.newText,
            status: 'to do',
            created_at: dayjs(new Date()).format('YYYY-MM-DD'),
            remind_at: dayjs(addDays(new Date(), 2)).format('YYYY-MM-DD'),
          },
        ];
      }

      dispatch(addTask(newTask));
      setToggle(false);
    }
  };

  const onRemove = id => () => {
    const newTask = propsTask.filter(item => item.id !== id);
    // console.log(id, newTask);
    setTask(newTask);
    dispatch(addTask(newTask));
  };

  const onTextChange = type => e => {
    if (type === 'new') setValue({newText: e.target.value});
    if (type === 'update') setValue({text: e.target.value});
  };

  const add = () => {
    setToggle(true);
  };

  const onCheckedChange = val => e => {
    const newItem = {...val};

    if (e.target.checked) {
      const newTask = propsTask.map(item => {
        if (val.id === item.id) {
          newItem.status = 'done';
          return newItem;
        }
        return item;
      });
      dispatch(addTask(newTask));
    } else {
      const newTask = propsTask.map(item => {
        if (val.id === item.id) {
          newItem.status = 'to do';
          return newItem;
        }
        return item;
      });
      dispatch(addTask(newTask));
    }
  };

  const onSelect = item => () => {
    setValue({num: item.id});
  };

  return (
    <>
      <div className={css.headWrapper}>
        <div className={css.headLabel}>A List</div>
        <button type="button" className={css.headButton} onClick={add}>
          + Task 추가
        </button>
      </div>
      {task.length > 0
        ? task.map(item => {
            return (
              <div
                key={`${item.name}${item.id}`}
                className={cx(css.wrapper, item.id === value.num ? css.selectedBg : '')}
                onClick={onSelect(item)}
              >
                <div className={css.label}>
                  <label
                    htmlFor={`${item.name}${item.id}`}
                    className={cx(css.approveCheck, item.status === 'to do' ? css.approveChecked : null)}
                  >
                    <input
                      id={`${item.name}${item.id}`}
                      type="checkbox"
                      className={css.hiddenCheck}
                      checked={item.check}
                      onChange={onCheckedChange(item)}
                    />
                    {/* {`${item.name}`} */}
                    <div style={{display: 'inline-block'}}>
                      <div style={{display: 'inline-block'}}>{`${item.name} 예약(${item.remind_at})`}</div>
                      {/* <div style={{display: 'inline-block'}}></div> */}
                    </div>
                    {/* {`${item.name} ${item.remind_at.toString()}`} */}
                    {/* <div>{`${item.name} 예약(${item.remind_at})`}</div> */}
                  </label>
                </div>
                <button type="button" className={css.delete} onClick={onRemove(item.id)}>
                  삭제
                </button>
              </div>
            );
          })
        : null}

      {toggle ? (
        <input
          type="text"
          className="round-input"
          value={value.newText}
          onChange={onTextChange('new')}
          onKeyPress={handleKeyPress('new')}
        />
      ) : null}
    </>
  );
};

export default Task;
