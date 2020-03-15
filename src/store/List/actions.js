import * as type from 'store/List/types';

export const addList = newList => ({
  type: type.ADD_LIST,
  payload: {
    newList,
  },
});

export const addTask = task => ({
  type: type.ADD_TASK,
  payload: {
    task,
  },
});

export const selectedList = id => ({
  type: type.SELECTED_LIST,
  payload: {
    id,
  },
});
