/**
 * 歌词
 */

export default function lyric (state = {}, action) {
  switch (action.type) {
    case 'GET_LYRIC_INFO':
      return Object.assign({}, state, {
        lyrics: action.lyrics,
        totalTime: action.totalTime,
        isVisible: action.isVisible
      });

    case 'TOGGLE_LYRIC':
      return Object.assign({}, state, {
        isVisible: action.isVisible
      });

    case 'MODIFY_LYRIC_REMAINTIME':
      return Object.assign({}, state, {
        remainTime: action.remainTime
      });

    default:
      return state;
  }
}
