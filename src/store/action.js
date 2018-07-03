import axios from 'axios'
axios.defaults.baseURL = "/"
// 默认不携带cookie信息
axios.defaults.withCredentials=true;
import Notice from 'iview/src/components/notice';
import router from '../router';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.onUploadProgress= function (e) {
//console.log(e)
//}
const TestUrl = 'http://server.sangyiwen.top';
axios.create({
  timeout: 10000,
  withCredentials: true,
})

function checkStatus (response) {
  console.log(response);
  if(response.data.code != 200) {
    // if(response.data.code == 302) {
    //   // 未登录
    //   router.push({ name: 'login'});
    // }
    Notice.error({
      title: response.data.message
    });
  }
  return response.data;
}

function checkError (error) {
  console.log('error',error)
  if(!!error.response && (error.response.status == 404 || error.response.status == 404 >= 500)){
    Notice.error({
      title: error.message
    });
  }else{
     Notice.error({
      title: '服务器开小差了，请重新登录！'
    });
    router.push({name:'login'})
  }
}

export function get(url, params) {
  return axios({
    method: 'get',
    baseURL: TestUrl,
    url,
    data: params,
  }).then(function (response) {
    return checkStatus(response);
  }).catch(function (error) {
    return checkError(error);
  });
}

export function post(url, params) {
  console.log('url',url)
  return axios({
    method: 'post',
    baseURL: TestUrl,
    url,
    data: params,
  }).then(function (response) {

    return checkStatus(response);
  }).catch(function (error) {
    return checkError(error);
  });
}

