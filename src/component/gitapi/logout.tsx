const logout = async () => {
  
  await sessionStorage.removeItem('accessToken')
  // 從網址中刪除 code
  window.location.search = ''
  
}

export default logout
