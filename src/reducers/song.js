/**
 * 歌曲
*/

export default function song (state = {}, action) {
  switch (action.type) {
    case 'GET_SONGS':
      return Object.assign({}, state, {
        list: action.list,
        playIndex: action.playIndex,
        playVisible: action.playVisible,
        playModel: action.playModel,
        playSound: action.playSound,
        playProgress: action.playProgress
      });

    case 'MODIFY_SONG_PLAY_INDEX':
      return Object.assign({}, state, {
        playIndex: action.playIndex
      });

    case 'MODIFY_SONG_PLAY_VISIBLE':
      return Object.assign({}, state, {
        playVisible: action.playVisible
      });

    case 'MODIFY_SONG_PLAY_MODEL':
      return Object.assign({}, state, {
        playModel: action.playModel
      });

    case 'MODIFY_SONG_PLAY_SOUND':
      return Object.assign({}, state, {
        playSound: action.playSound
      });

    case 'MODIFY_SONG_PLAY_PROGRESS':
      return Object.assign({}, state, {
        playProgress: action.playProgress
      });

    default:
      return state;
  }
}
