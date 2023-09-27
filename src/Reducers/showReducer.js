const initialState = { showList: [] };

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHOW_LIST':
      return { ...state, showList: [...action.payload] };
    default:
      return state;
  }
};

export default showReducer;
