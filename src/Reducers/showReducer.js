const initialState = { home: {}, kids: {} };

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HOME_DATA':
      return { ...state, home: { ...action.payload } };
    case 'FETCH_KIDS_DATA':
      return { ...state, kids: { ...action.payload } };
    default:
      return state;
  }
};

export default showReducer;
