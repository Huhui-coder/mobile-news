import request from '../utils/request'

export function fetchList(query) {
  return request({
    url: 'satinGodApi',
    method: 'get',
    params: query
  })
}

