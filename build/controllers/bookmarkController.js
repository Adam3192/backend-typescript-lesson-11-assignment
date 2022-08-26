"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.updateBookmark = exports.getBookmark = exports.createBookmark = exports.getAllBookmarks = void 0;
const bookmark_1 = require("../models/bookmark");
const auth_1 = require("../services/auth");
const getAllBookmarks = async (req, res, next) => {
    let bookmarks = await bookmark_1.Bookmark.findAll();
    res.status(200).json(bookmarks);
};
exports.getAllBookmarks = getAllBookmarks;
const createBookmark = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newBookmark = req.body;
    if (newBookmark.title && newBookmark.url) {
        let created = await bookmark_1.Bookmark.create(newBookmark);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createBookmark = createBookmark;
const getBookmark = async (req, res, next) => {
    let bookmarkId = req.params.id;
    let bookmark = await bookmark_1.Bookmark.findByPk(bookmarkId);
    if (bookmark) {
        res.status(200).json(bookmark);
    }
    else {
        res.status(404).json({});
    }
};
exports.getBookmark = getBookmark;
const updateBookmark = async (req, res, next) => {
    let bookmarkId = req.params.bookmarkId;
    let newBookmark = req.body;
    let bookmarkFound = await bookmark_1.Bookmark.findByPk(bookmarkId);
    if (bookmarkFound && bookmarkFound.bookmarkId == newBookmark.bookmarkId
        && newBookmark.title && newBookmark.url) {
        await bookmark_1.Bookmark.update(newBookmark, {
            where: { bookmarkId: bookmarkId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateBookmark = updateBookmark;
const deleteBookmark = async (req, res, next) => {
    let bookmarkId = req.params.id;
    let found = await bookmark_1.Bookmark.findByPk(bookmarkId);
    if (found) {
        await bookmark_1.Bookmark.destroy({
            where: { bookmarkId: bookmarkId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteBookmark = deleteBookmark;
