const initialState = {
  home: {},
  kids: {},
  mindblownList: [],
  shorts: [],
  superstars: {},
  collection: {},
  searchCollection: {},
  channelCarouselData: [
    {
      id: 'investigation-discovery',
      title: 'Investigation Discovery',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/c956570d-b111-4410-93df-83ef1c45ffc9.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/049850cc-3b63-4b65-b2b7-5657f0bc5865.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'animal-planet',
      title: 'Animal Planet',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/422ea635-4833-4401-bdaf-7c171c2e472c.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/6bfada34-767b-4654-a6a2-526173c6da8c.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'discovery-channel',
      title: 'Discovery Channel',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/51e39f57-66bd-49a5-a166-c57f459f765f.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/328f4c6f-e0be-4c88-a39f-e19facc0bc0b.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'discovery-kids',
      title: 'Discovery Kids',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/636b0db9-e298-43d3-97a2-f628986a0426.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/096e7fc7-8beb-4f84-b74d-2041d0223832.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'discovery-turbo',
      title: 'Discovery Turbo',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/8104e113-f6d2-46b2-85e2-c2c497eb8307.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/8fe22165-ee25-4c33-85d8-fce64db3dd00.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'discovery-science',
      title: 'Discovery Science',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/abed6104-df4b-4804-ae09-6040d48d6299.png?bf=0&f=jpg&p=true&q=85&w=300',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/16/0ab4383a-aa67-4166-aeb6-fcc1c6e02e66.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'dmax',
      title: 'DMAX',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/a297d103-9ac7-4a10-8359-1e65abb625cc.png?bf=0&f=jpg&p=true&q=85&w=400',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/fb48c0ed-2188-4b01-bd17-25b45f6dd271.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'eurosport-india',
      title: 'Eurosport India',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/03/373989eb-46a9-4d3e-8d2e-80a76d77caee.png?bf=0&f=jpg&p=true&q=85&w=400',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/d187c23d-46da-4a59-8929-7534b7a01c0c.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'food-network',
      title: 'Food Network',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/683d0900-f8fc-43fa-915f-7bee36ccb3bf.png?bf=0&f=jpg&p=true&q=85&w=400',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/da9dc1f9-215f-4d3d-a628-0c9e2413fddb.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'tlc',
      title: 'TLC',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/16/644fb820-4583-4141-b251-bb2a70f2ca80.png?bf=0&f=jpg&p=true&q=85&w=350',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/32de18be-f5b9-422b-8478-4b3370c8d4d2.png?bf=0&f=png&p=true&q=75&w=100',
    },
    {
      id: 'trvl-channel',
      title: 'TRVL Channel',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2020/12/05/967c038f-8703-4f64-9446-5a9032c86c87.png?bf=0&f=jpg&p=true&q=85&w=400',
      thumbnailMobile:
        'https://ap2-prod-images.disco-api.com/2020/12/17/bf0cf5be-1b09-41be-b651-53fc15ff6ea9.png?bf=0&f=png&p=true&q=75&w=100',
    },
  ],
  channelShowListData: {},
  genreShowListData: {},
  showListData: {},
  youMayAlsoLike: [
    {
      id: 'little-singham',
      title: 'Little Singham',
      desc: 'A nine-year-old boy battles evil villains that are out to create chaos.',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2023/03/05/bbd9636c-a15b-413d-a6c5-82283024ed5d.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
      isPremium: true,
      hasNewEpisodes: false,
    },
    {
      id: 'fukrey-boyzzz-in',
      title: 'Fukrey Boyzzz',
      desc: 'Choocha, Hunny and Laali are kids with limited means but great dreams.',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2023/05/15/e75ded76-173d-4b3e-aa57-028d00bab525.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
      isPremium: true,
      hasNewEpisodes: false,
    },
    {
      id: 'swami-ramdev-ek-sangharsh-in',
      title: 'Swami Ramdev: Ek Sangharsh',
      desc: 'Discover how Swami Ramdev changed the health of the nation.',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2023/06/01/37eb2e61-c013-40ec-b076-41f1c9ad7723.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
      isPremium: true,
      hasNewEpisodes: false,
    },
    {
      id: 'gold-rush',
      title: 'Gold Rush',
      desc: 'Hard-working gold miners risk their lives for a chance at striking it rich.',
      thumbnail:
        'https://ap2-prod-images.disco-api.com/2023/09/26/293263a9-8d4f-4068-96d8-f3977cd1db95.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
      isPremium: false,
      hasNewEpisodes: true,
    },
  ],
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

    case 'FETCH_SEARCH_COLLECTIONS_DATA':
      return {
        ...state,
        searchCollection: action.payload,
      };

    case 'UPDATE_CHANNEL_CAROUSEL_DATA':
      const targetObject = state.channelCarouselData.find(
        item => item.id === action.payload
      );

      if (targetObject) {
        return {
          ...state,
          channelCarouselData: [
            targetObject,
            ...state.channelCarouselData.filter(
              item => item.id !== action.payload
            ),
          ],
        };
      } else {
        return state;
      }

    case 'FETCH_CHANNEL_SHOW_LIST_DATA':
      return {
        ...state,
        channelShowListData: {
          ...state.channelShowListData,
          [action.payload.id]: action.payload.showList,
        },
      };

    case 'FETCH_GENRE_SHOW_LIST_DATA':
      return {
        ...state,
        genreShowListData: {
          ...state.genreShowListData,
          [action.payload.id]: action.payload.showList,
        },
      };

    case 'FETCH_SHOW_DATA':
      return {
        ...state,
        showListData: {
          ...state.showListData,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default showReducer;
