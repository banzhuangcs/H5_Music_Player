/**
 * 播放action creators
*/

export const modifyPlayIndex = (playIndex) => ({
  type: 'MODIFY_PLAY_INDEX',
  playIndex
});

export const modifyPlayCondition = (playCondition) => ({
  type: 'MODIFY_PLAY_CONDITION',
  playCondition
});

export const modifyPlayVolume = (playVolume) => ({
  type: 'MODIFY_PLAY_VOLUME',
  playVolume
});

export const modifyPlayModel = (playModel) => ({
  type: 'MODIFY_PLAY_MODEL',
  playModel
});

export const modifyPlayProgress = (playProgress, autoProgress) => ({
  type: 'MODIFY_PLAY_PROGRESS',
  playProgress,
  autoProgress
});
