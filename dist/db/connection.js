"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const db = process.env.DB || "mongodb://127.0.0.1/sociomedia";
(0, mongoose_1.connect)(db)
    .then(() => console.log(`connected to db`))
    .catch(err => console.log(err));
