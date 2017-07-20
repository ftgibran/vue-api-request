import axios from 'axios'

export default {
  fakeRequest: (params = {}) => new Promise(resolve => {
    setTimeout(() => resolve(params.response), params.time)
  }),
  giphyRandom: (params = {}) => axios.get(`//api.giphy.com/v1/gifs/random`, {
    params: {
      api_key: 'ceea3d73eee446f48e2a645e117b1f31',
      tag: params.tag,
      rating: params.rating
    }
  }),
  giphySearch: (params = {}) => axios.get(`//api.giphy.com/v1/gifs/search`, {
    params: {
      api_key: 'ceea3d73eee446f48e2a645e117b1f31',
      q: params.q,
      limit: params.limit,
      offset: params.offset
    }
  })
}
