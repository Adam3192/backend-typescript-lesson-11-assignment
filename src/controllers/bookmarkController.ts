import { RequestHandler } from 'express'
import { Bookmark } from '../models/bookmark'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'

export const getAllBookmarks: RequestHandler = async (req, res, next) => {
  let bookmarks = await Bookmark.findAll()
  res.status(200).json(bookmarks)
}

export const createBookmark: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let newBookmark: Bookmark = req.body
  newBookmark.userId = user.userId

  if (newBookmark.title && newBookmark.url) {
    let created = await Bookmark.create(newBookmark)
    res.status(201).json(created)
  } else {
    res.status(400).send()
  }
}

export const getBookmark: RequestHandler = async (req, res, next) => {
  let bookmarkId = req.params.id
  let bookmark = await Bookmark.findByPk(bookmarkId)
  if (bookmark) {
    res.status(200).json(bookmark)
  } else {
    res.status(404).json({})
  }
}

export const updateBookmark: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let bookmarkId = req.params.id
  let newBookmark: Bookmark = req.body

  let bookmarkFound = await Bookmark.findByPk(bookmarkId)

  if (
    bookmarkFound &&
    bookmarkFound.userId == user.userId &&
    bookmarkFound.bookmarkId == newBookmark.bookmarkId &&
    newBookmark.title &&
    newBookmark.url
  ) {
    await Bookmark.update(newBookmark, {
      where: { bookmarkId: bookmarkId },
    })
    res.status(200).json()
  } else {
    res.status(400).json()
  }
}

export const deleteBookmark: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let bookmarkId = req.params.id
  let found = await Bookmark.findByPk(bookmarkId)

  if (found && found.userId == user.userId) {
    await Bookmark.destroy({
      where: { bookmarkId: bookmarkId },
    })
    res.status(200).json()
  } else {
    res.status(404).json()
  }
}
