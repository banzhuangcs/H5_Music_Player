/**
 * 歌词
 */

export default function lyric (state = {}, action) {
  switch (action.type) {
    case 'GET_LYRIC_INFO':
      return Object.assign({}, state, {
        list: action.list,
        totalTime: action.totalTime,
        isVisible: action.isVisible
      });

    case 'TOGGLE_LYRIC':
      return Object.assign({}, state, {
        isVisible: action.isVisible
      });

    default:
      return state;
  }
}
