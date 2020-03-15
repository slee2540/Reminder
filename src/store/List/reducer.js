import produce from 'immer';
import * as type from 'store/List/types';

const initState = {
  list: [],
  task: [],
  selectedList: '',
};

const list = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case type.ADD_LIST: {
        const {newList} = action.payload;
        draft.list = newList;
        break;
      }

      case type.ADD_TASK: {
        const {task} = action.payload;
        draft.task = task;
        break;
      }

      case type.SELECTED_LIST: {
        const {id} = action.payload;
        draft.selectedList = id;
        break;
      }

      default:
        break;
    }
  });

export default list;
