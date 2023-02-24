const logout = async () => {
  // 從網址中刪除 code
  await sessionStorage.removeItem('accessToken')
  window.location.search = ''
  
}

export default logout
