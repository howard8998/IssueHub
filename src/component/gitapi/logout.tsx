const logout = async () => {
  
  await sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('username')
  // 從網址中刪除 code
  window.location.search = ''
  
}

export default logout
