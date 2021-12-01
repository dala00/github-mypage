import { Handler } from '@/server/types'
import authenticated from './authenticated'
import method, { Method } from './method'

const api = (handler: Handler, httpMethod: Method): Handler =>
  method(authenticated(handler), httpMethod)

export default api
