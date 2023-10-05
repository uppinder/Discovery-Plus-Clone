const initialState = {
  home: {},
  kids: {},
  mindblownList: [],
  shorts: [],
  superstars: {},
  collection: {},
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HOME_DATA':
      return { ...state, home: { ...action.payload } };
    case 'FETCH_KIDS_DATA':
      return { ...state, kids: { ...action.payload } };
    case 'FETCH_MINDBLOWN_LIST_DATA':
      return { ...state, mindblownList: action.payload };
    case 'FETCH_SHORTS_DATA':
      return { ...state, shorts: [...state.shorts, ...action.payload] };
    case 'FETCH_SUPERSTAR_DATA':
      return {
        ...state,
        superstars: {
          ...state.superstars,
          [action.payload.id]: action.payload.episodes,
        },
      };
    case 'FETCH_COLLECTIONS_DATA':
      return {
        ...state,
        collection: {
          ...state.collection,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default showReducer;
