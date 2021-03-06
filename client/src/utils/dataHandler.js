import axios from "axios";

export const DataHandle = (function() {
  const postData = (url, userObject, handleUniqueRegister) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        handleUniqueRegister();
      });
  };

  const getData = (url, cb) => {
    axios
      .get(url)
      .then(res => {
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const authenticateUser = (url, userObject, cb) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const googgleAuthentication = (url, userObject, cb) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { postData, getData, authenticateUser, googgleAuthentication };
})();
