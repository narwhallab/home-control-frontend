// get a cookie value by key
function getCookie(cookieKey: string): string | null {
    let name = `${cookieKey}=`
    let cookieList = decodeURIComponent(document.cookie).split(';')
    for (let i = 0; i < cookieList.length; i++) {
        let currentCookie = cookieList[i].trimStart()
        if (currentCookie.indexOf(name) == 0) {
            return currentCookie.substring(name.length, currentCookie.length)
        }
    }
    return null
}

// expire a cookie
function expireCookie(cookieKey: string) {
    document.cookie = cookieKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

export { getCookie, expireCookie }