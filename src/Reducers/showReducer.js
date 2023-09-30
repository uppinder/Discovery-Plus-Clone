const initialState = { home: {} };

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHOW_LIST':
      return { ...state, home: { ...action.payload } };
    default:
      return state;
  }
};

export default showReducer;
