/**
 * 歌曲
*/

export default function song (state = {}, action) {
  switch (action.type) {
    case 'GET_SONGS':
      return Object.assign({}, state, { songs: action.songs });

   default:
     return state;
  }
}
