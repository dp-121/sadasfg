const mongoose = require("mongoose");
require('dotenv').config();

async function connectToDB() {
    const remoteUri = process.env.MONGO_URI;
    const localUri = "mongodb://127.0.0.1:27017/chap1db";

    async function connect(uri) {
        try {
            await mongoose.connect(uri);
            console.log(`Connected to MongoDB (${uri.includes('127.0.0.1') ? 'local' : 'remote'})`);
            return true;
        } catch (err) {
            console.error(`Failed to connect to MongoDB at ${uri}:`, err.message || err);
            return false;
        }
    }

    if (remoteUri) {
        const ok = await connect(remoteUri);
        if (ok) return;
        console.warn('Remote DB failed; trying local MongoDB fallback.');
    }

    const okLocal = await connect(localUri);
    if (!okLocal) {
        console.warn('DB connection could not be established. The app will keep running but some features may fail.');
    }
}

module.exports = connectToDB;