/**
 * 歌词
 */

export default function lyric (state = {}, action) {
  switch (action.type) {
    case 'GET_LYRIC_INFO':
      return Object.assign({}, state, {
        lyrics: action.lyrics
      });

    case 'TOGGLE_LYRIC':
      return Object.assign({}, state, {
        isVisible: action.isVisible
      });

    case 'MODIFY_LYRIC_REMAINTIME':
      return Object.assign({}, state, {
        remainTime: action.remainTime
      });

    case 'MODIFY_LYRIC_TOTALTIME':
      return Object.assign({}, state, {
        totalTime: action.totalTime
      });

    default:
      return state;
  }
}
