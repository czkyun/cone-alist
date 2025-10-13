import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const host = "https://alist.aoe.top";
// const host = 'https://download.aoe.top'

const alist_token = process.env.alist_token;
const ROOT_PATH = process.env.ROOT_PATH || "/";
const headers: any = {
    Authorization: alist_token,
    "Content-Type": "application/json",
};

async function refreshToken() {
    const url = `${host}/api/auth/login`;

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);

    if (data.code == 200) {
        headers.Authorization = data.data.token;
    }
}

router.post("/getFileList", async (req, res) => {
    let { path, page, per_page } = req.body;

    path = join(ROOT_PATH, path);

    try {
        const url = `${host}/api/fs/list`;

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ path, page, per_page }),
        });
        const data = await response.json();
        if (data.code != 200) {
            refreshToken();
        }

        return res.json(data);
    } catch (error: any) {
        console.log(error);
        return res.json({ code: 500, message: error.message });
    }
});

router.post("/getFileContent", async (req, res) => {
    let { path } = req.body;

    path = join(ROOT_PATH, path);

    try {
        const url = `${host}/api/fs/get`;
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ path }),
        });
        const data = await response.json();
        return res.json(data);
    } catch (error: any) {
        console.log(error);
        return res.json({ code: 500, message: error.message });
    }
});

router.post("/getSiteName", async (req, res) => {
    const name = process.env.SITE_NAME || "私有云网盘";
    return res.json({ code: 200, data: name });
});

export default router;
