"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    audioUrl: { type: String, required: true },
    audioPublicId: { type: String },
    coverUrl: { type: String },
    coverPublicId: { type: String },
    isPublic: { type: Boolean, default: true },
}, { timestamps: true });
exports.Song = (0, mongoose_1.model)('Song', songSchema);
