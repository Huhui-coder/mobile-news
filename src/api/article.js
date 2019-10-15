import request from '@/utils/request'

export function fetchList(query) {
  return request({
    baseURL:'',
    url: '/article/list',
    method: 'get',
    params: query
  })
}

