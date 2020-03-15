import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cx from 'classnames';
import dayjs from 'dayjs';
import shortid from 'shortid';
import {addList, addTask, selectedList} from 'store/List/actions';
import css from './list.module.css';

const List = () => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState({
    num: '0',
    text: '',
    newText: '',
  });

  const dispatch = useDispatch();
  const list = useSelector(state => state.list.list);
  const propsTask = useSelector(state => state.list.task);
  const selected = useSelector(state => state.list.selectedList);

  useEffect(() => {}, [list, propsTask, selected]);

  const onRemove = id => () => {
    const newList = list.filter(item => item.id !== id);
    const newTask = propsTask.filter(item => item.list !== id);
    dispatch(addList(newList));
    dispatch(addTask(newTask));
  };

  const onModify = index => () => {
    // dispatch(addTask(propsTask));
    dispatch(selectedList(index));
    console.log(list[index].name, list[index].id);
    setValue({...value, num: list[index].id, newText: '', text: list[index].name});
  };

  const handleKeyPress = (type, id) => e => {
    if (e.key === 'Enter') {
      let tempList = null;

      if (type === 'new') {
        tempList = [
          ...list,
          {id: shortid.generate(), name: value.newText, created_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm')},
        ];
      }

      if (type === 'update') {
        tempList = list.map(item => {
          if (item.id === id) {
            return {...item, name: value.text};
          }
          return item;
        });
      }

      dispatch(addList(tempList));
      setToggle(false);
      setValue({num: '', newText: ''});
    }
  };

  const onTextChange = type => e => {
    if (type === 'new') setValue({...value, newText: e.target.value});
    if (type === 'update') setValue({...value, text: e.target.value});
  };

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const add = () => {
    setToggle(true);
  };

  return (
    <>
      {list.length > 0
        ? list.map((item, index) => {
            return (
              <div key={`${item.id}`} className={cx(css.wrapper, item.id === value.num ? css.selectedBg : '')}>
                <input
                  type="text"
                  className="round-input"
                  style={{color: item.id !== value.num ? getRandomColor() : null}}
                  value={item.id !== value.num ? item.name : value.text}
                  disabled={item.id !== value.num}
                  onChange={item.id === value.num ? onTextChange('update') : null}
                  onKeyPress={item.id === value.num ? handleKeyPress('update', item.id) : null}
                />
                <button type="button" className={css.modify} onClick={onModify(index)}>
                  수정
                </button>
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
      <div className={css.buttonWrapper}>
        <button type="button" className={css.button} onClick={add}>
          + List 추가
        </button>
      </div>
    </>
  );
};

export default List;
