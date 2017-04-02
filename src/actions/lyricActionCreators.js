/**
 * 歌词Action Creator
 */

import 'whatwg-fetch';

export const getLyricInfo = (url, getLyricList, getLyricTotalTime) => (dispatch) => {
  fetch(url)
    .then(res => res.text())
    .catch(error => error.message)
    .then(lyric => {
      const list = getLyricList(lyric);
      const totalTime = getLyricTotalTime(lyric);
      dispatch({
        type: 'GET_LYRIC_INFO',
        totalTime,
        list,
        isVisible: true
      })
    })
};

export const modifyLyricUseTime = (useTime) => ({
  type: 'MODIFY_LYRIC_USETIME',
  useTime
});

export const toggleLyric = (isVisible) => ({
  type: 'TOGGLE_LYRIC',
  isVisible
});

/* url, {
  method: 'GET',
  body:
  headers: {

  }
}
.then((res) => {
  return res.text()
    res.json()
})
res.ok
res.status
res.statusText
*/
