import * as type from 'store/List/types';

export const addList = newList => ({
  type: type.ADD_LIST,
  payload: {
    newList,
  },
});

export const addTask = (task, id) => ({
  type: type.ADD_TASK,
  payload: {
    task,
    id,
  },
});

export const selectedList = id => ({
  type: type.SELECTED_LIST,
  payload: {
    id,
  },
});
