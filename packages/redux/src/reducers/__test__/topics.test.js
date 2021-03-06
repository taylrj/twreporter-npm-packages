/* global expect, test, describe */

import { topic, topics } from '../topics'
import types from '../../constants/action-types'
import pagination from '../../utils/pagination'

const { offsetToPage } = pagination

const topic1 = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
}

const topic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
}

describe('topic reducer', () => {
  test('should return the initial state', () => {
    expect(topic({}, {})).toEqual({})
  })

  test('should handle types.selectedTopic.read.success', () => {
    expect(
      topic(
        {},
        {
          type: types.selectedTopic.read.success,
          payload: {
            topic: topic1,
          },
        }
      )
    ).toEqual({
      slug: topic1.slug,
      error: null,
      isFetching: false,
    })
  })

  test('should handle types.selectedTopic.read.alreadyExists', () => {
    expect(
      topic(
        {},
        {
          type: types.selectedTopic.read.alreadyExists,
          payload: {
            topic: topic1,
          },
        }
      )
    ).toEqual({
      slug: topic1.slug,
      error: null,
      isFetching: false,
    })
  })

  test('should handle types.selectedTopic.read.failure', () => {
    const err = new Error('error occurs')
    expect(
      topic(
        {},
        {
          type: types.selectedTopic.read.failure,
          payload: {
            slug: 'mock-slug',
            error: err,
          },
        }
      )
    ).toEqual({
      slug: 'mock-slug',
      error: err,
      isFetching: false,
    })
  })
})

describe('topics reducer', () => {
  test('should return the initial state', () => {
    expect(topics({}, {})).toEqual({})
  })

  test('should handle `types.topics.read.success`', () => {
    const total = 10
    const limit = 3
    const offset = 6
    const { page, nPerPage, totalPages } = offsetToPage({
      total,
      limit,
      offset,
    })
    expect(
      topics(
        {},
        {
          type: types.topics.read.success,
          payload: {
            items: [topic1, topic2],
            total,
            limit,
            offset,
          },
        }
      )
    ).toEqual({
      items: {
        [page]: [topic1.id, topic2.id],
      },
      page,
      nPerPage,
      totalPages,
      error: null,
      isFetching: false,
    })
  })

  test('should handle `types.topics.read.failure`', () => {
    const err = new Error('error occurs')
    expect(
      topics(
        {
          items: [topic1.id, topic2.id],
          total: 10,
          error: null,
        },
        {
          type: types.topics.read.failure,
          payload: {
            error: err,
          },
        }
      )
    ).toEqual({
      items: [topic1.id, topic2.id],
      total: 10,
      error: err,
      isFetching: false,
    })
  })
})
