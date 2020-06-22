import types from '../constants/action-types'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'
import set from 'lodash/set'

const _ = {
  forEach,
  get,
  merge,
  set,
}

export function post(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_A_FULL_POST:
    case types.CHANGE_SELECTED_POST: {
      return {
        slug: _.get(action, 'payload.post.slug'),
        error: null,
        isFetching: false,
      }
    }

    case types.START_TO_GET_A_FULL_POST:
      return {
        isFetching: true,
        slug: _.get(action, 'payload.slug'),
        error: null,
      }

    case types.ERROR_TO_GET_A_FULL_POST:
      return action.payload
    default:
      return state
  }
}

export function posts(state = {}, action = {}) {
  switch (action.type) {
    case types.postsByListId.read.success: {
      const listId = _.get(action, 'payload.listId', '')

      if (!listId) {
        return state
      }

      const posts = _.get(action, 'payload.items', [])
      const newItems = []
      _.forEach(posts, post => {
        const id = _.get(post, 'id', '')
        if (id) {
          newItems.push(id)
        }
      })

      const total = _.get(action, 'payload.total', 0)
      const page = _.get(action, 'payload.page', 0)
      const oldItems = _.get(state, [listId, 'items'], [])

      // Make sure we declare
      // `items` and `pages` as `undefined`.
      // The reason we use `undefined` is because
      // `lodash/merge` will not replace the old value if
      // new value is `undefined`.
      let items
      let pages
      if (newItems.length > 0 && page >= 1) {
        const startAt = oldItems.length
        const endAt = startAt + newItems.length - 1
        // pages is used to store items position,
        // say, if
        // pages = {
        //  1: [0, 9]
        // }
        // which means, items of page 1 are stored
        // from items[0] to items[9]
        pages = {
          [page]: [startAt, endAt],
        }

        items = [].concat(oldItems, newItems)
      }

      return _.merge({}, state, {
        [listId]: {
          pages,
          items,
          total,
          error: null,
          isFetching: false,
        },
      })
    }
    case types.postsByListId.read.failure: {
      const listId = _.get(action, 'payload.listId')

      if (!listId) {
        return state
      }

      return _.merge({}, state, {
        [listId]: {
          error: _.get(action, 'payload.error'),
          isFetching: false,
        },
      })
    }
    case types.postsByListId.read.request:
      const listId = _.get(action, 'payload.listId')

      if (!listId) {
        return state
      }

      return _.merge({}, state, {
        [listId]: {
          error: null,
          isFetching: true,
        },
      })
    default:
      return state
  }
}
