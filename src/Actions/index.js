import { isEmpty } from 'lodash';
import discoveryPlusApi from '../Api';

const setUserProfile = userProfile => {
  return {
    type: 'SET_USER_PROFILE',
    payload: { ...userProfile, loginTime: new Date().getTime() },
  };
};

const unsetUserProfile = () => {
  return {
    type: 'UNSET_USER_PROFILE',
    payload: null,
  };
};

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
  if (isSearchView) {
    if (params.type === 'Shows') {
      endpoint = `/search_shows?q=${params.q}`;
    } else {
      endpoint = `/search_shows?q=${params.q}`;
    }

    return async dispatch => {
      try {
        const { data } = await discoveryPlusApi(endpoint);
        dispatch({
          type: 'FETCH_SEARCH_COLLECTIONS_DATA',
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    endpoint = `/collection-view-all/${params.id}`;
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
  }
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

const fetchMindblownData = mindblownId => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/mindblown/${mindblownId}`);
      dispatch({
        type: 'FETCH_MINDBLOWN_DATA',
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

const fetchChannelListData = channelId => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/channels/${channelId}`);
      dispatch({
        type: 'FETCH_CHANNEL_SHOW_LIST_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchGenreListData = genreId => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/genres/${genreId}`);
      dispatch({
        type: 'FETCH_GENRE_SHOW_LIST_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchShowData = showId => {
  return async dispatch => {
    try {
      const { data } = await discoveryPlusApi(`/shows/${showId}`);
      dispatch({
        type: 'FETCH_SHOW_DATA',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  setUserProfile,
  unsetUserProfile,
  fetchHomeData,
  fetchKidsData,
  fetchSuperstarData,
  fetchCollectionsData,
  fetchMindblownData,
  fetchMindblownListData,
  fetchShortsData,
  updateChannelCarouselData,
  fetchChannelListData,
  fetchGenreListData,
  fetchShowData,
};
