import discoveryPlusApi from '../Api';

const fetchShowList = () => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi('/home');
      dispatch({
        type: 'FETCH_SHOW_LIST',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { fetchShowList };
