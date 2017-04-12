/**
 play reducer
*/

export default function play (state = {}, action) {
  switch (action.type) {
    case 'MODIFY_PLAY_INDEX':
      return Object.assign({}, state, { playIndex: action.playIndex });

    case 'MODIFY_PLAY_CONDITION':
      return Object.assign({}, state, { playCondition: action.playCondition });

    case 'MODIFY_PLAY_VOLUME':
      return Object.assign({}, state, { playVolume: action.playVolume });

    case 'MODIFY_PLAY_MODEL':
      return Object.assign({}, state, { playModel: action.playModel });

    case 'MODIFY_PLAY_PROGRESS':
      return Object.assign({}, state, { playProgress: action.playProgress, autoProgress: action.autoProgress });

    default:
      return state;
  }
}
