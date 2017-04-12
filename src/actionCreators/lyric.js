/**
 * 歌词Action Creator
 */

import 'whatwg-fetch';

export const getLyricInfo = (url, getLyricList) => (dispatch) => {
  fetch(url)
    .then(res => res.text())
    .catch(error => error.message)
    .then(lyric => {
      dispatch({
        type: 'GET_LYRIC_INFO',
        lyrics: getLyricList(lyric)
      })
    })
};

export const modifyLyricRemainTime = (remainTime) => ({
  type: 'MODIFY_LYRIC_REMAINTIME',
  remainTime
});

export const modifyLyricTotalTime = (totalTime) => ({
  type: 'MODIFY_LYRIC_TOTALTIME',
  totalTime
});

export const toggleLyric = (isVisible) => ({
  type: 'TOGGLE_LYRIC',
  isVisible
});
