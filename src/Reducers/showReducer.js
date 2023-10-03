const initialState = { home: {}, kids: {}, mindblownList: {} };

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HOME_DATA':
      return { ...state, home: { ...action.payload } };
    case 'FETCH_KIDS_DATA':
      return { ...state, kids: { ...action.payload } };
    case 'FETCH_MINDBLOWN_LIST_DATA':
      return { ...state, mindblownList: action.payload };
    default:
      return state;
  }
};

export default showReducer;
