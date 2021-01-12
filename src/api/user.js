import request from '@/utils/request'


/* 
/admin/acl/index/info
info

POST /admin/acl/index/login
login

POST /admin/acl/index/logout
logout

GET /admin/acl/index/menu
*/
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
