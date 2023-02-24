const logout = async () => {
  // 從網址中刪除 code
  window.location.search = ''
  await sessionStorage.removeItem('accessToken')
  // 或者，如果要在網址中保留其他 query parameter，可以使用 URLSearchParams 來刪除 code
  /*const urlParams = new URLSearchParams(window.location.search)
  urlParams.delete('code')
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${urlParams}`,
  )*/
}

export default logout
