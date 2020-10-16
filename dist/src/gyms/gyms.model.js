"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = void 0;
const mongoose = require("mongoose");
const gymSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coordinates: {
        type: String,
        required: true,
    },
    ex: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
    },
});
exports.Gym = mongoose.model("Gym", gymSchema);
//# sourceMappingURL=gyms.model.js.map