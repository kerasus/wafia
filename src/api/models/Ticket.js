import { appApiInstance } from 'src/boot/axios'
import APIRepository from '../classes/APIRepository.js'
import { Ticket, TicketList } from 'src/models/Ticket.js'

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', appApiInstance)
    this.APIAdresses = {
      base: '/mma/tickets',
      byId: (id) => '/mma/tickets/' + id,
      reply: (id) => '/mma/tickets/' + id + '/reply'
    }
    this.restUrl = (id) => this.url + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Ticket(response.data) },
      post: (response) => { return new Ticket(response.data) },
      put: (response) => { return new Ticket(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new TicketList(results),
          paginate
          // {
          //   "count": 1,
          //   "num_pages": 1,
          //   "per_page": 10,
          //   "current": 1,
          //   "next": null,
          //   "previous": null,
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  reply(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.reply(data.id),
      data: this.getNormalizedSendData({
        body: '' // String
      }, data),
      resolveCallback: (response) => {
        return new Ticket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
