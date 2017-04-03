/**
 * 歌词Action Creator
 */

import 'whatwg-fetch';

export const getLyricInfo = (url, getLyricList, getLyricTotalTime) => (dispatch) => {
  fetch(url)
    .then(res => res.text())
    .catch(error => error.message)
    .then(lyric => {
      const lyrics = getLyricList(lyric);
      const totalTime = getLyricTotalTime(lyric);
      dispatch({
        type: 'GET_LYRIC_INFO',
        totalTime,
        lyrics
      })
    })
};

export const modifyLyricRemainTime = (remainTime) => ({
  type: 'MODIFY_LYRIC_REMAINTIME',
  remainTime
});

export const toggleLyric = (isVisible) => ({
  type: 'TOGGLE_LYRIC',
  isVisible
});
