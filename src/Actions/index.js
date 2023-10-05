import { isEmpty } from 'lodash';
import discoveryPlusApi from '../Api';

const fetchHomeData = () => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/home`);
      dispatch({
        type: 'FETCH_HOME_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchKidsData = () => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/kids`);
      dispatch({
        type: 'FETCH_KIDS_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchSuperstarData = superstarId => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/superstars/${superstarId}`);
      dispatch({
        type: 'FETCH_SUPERSTAR_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchCollectionsData = (params, isSearchView = false) => {
  let endpoint = '';
  //   if (isSearchView) {
  //     endpoint = `/collection-view-all`;
  //   } else {
  endpoint = `/collection-view-all/${params.id}`;
  //   }

  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(endpoint);
      dispatch({
        type: 'FETCH_COLLECTIONS_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchMindblownListData = () => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/mindblownList`);
      dispatch({
        type: 'FETCH_MINDBLOWN_LIST_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchShortsData = pageNumber => {
  const start = pageNumber * 10;
  const end = (pageNumber + 1) * 10;

  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(
        `/shorts?_start=${start}&_end=${end}`
      );

      if (isEmpty(data)) {
        return;
      }

      dispatch({
        type: 'FETCH_SHORTS_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const updateChannelCarouselData = channelId => {
  return {
    type: 'UPDATE_CHANNEL_CAROUSEL_DATA',
    payload: channelId,
  };
};

export {
  fetchHomeData,
  fetchKidsData,
  fetchSuperstarData,
  fetchCollectionsData,
  fetchMindblownListData,
  fetchShortsData,
  updateChannelCarouselData,
};
