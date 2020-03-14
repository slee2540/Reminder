import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {addList, selectedList} from 'store/List/actions';
import css from './list.module.css';

const List = () => {
  const [list, setList] = useState([]);
  const [num, setNum] = useState('0');
  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const propsList = useSelector(state => state.list);

  useEffect(() => {
    setList(propsList.list);
  }, [propsList]);

  const onRemove = id => () => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    dispatch(addList(newList));
  };

  const onModify = id => () => {
    setNum(id);
    dispatch(selectedList(num));
    setText(list[id].name);
  };

  const handleKeyPress = (type, id) => e => {
    if (e.key === 'Enter') {
      let tempList = null;

      if (type === 'new') {
        tempList = [
          ...propsList.list,
          {id: propsList.list.length, name: newText, created_at: dayjs(new Date()).format('YYYY-MM-DD HH:mm')},
        ];
      }

      if (type === 'update') {
        tempList = list.map(item => {
          if (item.id === id) {
            return {...item, name: text};
          }
          return item;
        });
      }

      dispatch(addList(tempList));
      setToggle(false);
      setNewText('');
      setNum('');
    }
  };

  const onTextChange = type => e => {
    if (type === 'new') setNewText(e.target.value);
    if (type === 'update') setText(e.target.value);
  };

  const getRandomColor = () => {
    const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const add = () => {
    setToggle(true);
  };

  return (
    <>
      {list.length > 0
        ? list.map(item => {
            return (
              <div key={`${item.name}${item.id}`} className={css.wrapper}>
                {/* <div className={css.label}>{item.name}</div> */}
                <input
                  type="text"
                  className="round-input"
                  style={{color: item.id !== num ? getRandomColor() : null}}
                  value={item.id !== num ? item.name : text}
                  disabled={item.id !== num}
                  onChange={item.id === num ? onTextChange('update') : null}
                  onKeyPress={item.id === num ? handleKeyPress('update', item.id) : null}
                />
                <button type="button" className={css.modify} onClick={onModify(item.id)}>
                  수정/선택
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
          value={newText}
          onChange={onTextChange('new')}
          onKeyPress={handleKeyPress('new')}
        />
      ) : null}

      <button type="button" className={css.headButton} onClick={add}>
        + List 추가
      </button>
    </>
  );
};

export default List;
