import cookie from "universal-cookie";
const _Cookie = new cookie();

export const CommonHandler = (function() {
  const setCookie = (cookieName, data) => {
    _Cookie.set(cookieName, data);
  };

  const removeCookie = cookieName => {
    _Cookie.remove(cookieName);
  };

  const getCookie = cookieName => {
    return _Cookie.get(cookieName);
  };

  return { setCookie, removeCookie, getCookie };
})();
