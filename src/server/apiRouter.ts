import express from 'express';
import { join } from 'path';
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();

// const host = 'https://cloud-slave.aoe.top:5244'
const host = 'https://download.aoe.top'

const alist_token = process.env.alist_token
const ROOT_PATH = process.env.ROOT_PATH || '/'
const headers: any = {
    'Authorization': alist_token,
    'Content-Type': 'application/json',
}

router.post('/getFileList', async (req, res) => {
    let { path, page, per_page } = req.body

    path = join(ROOT_PATH, path)

    try {
        const url = `${host}/api/fs/list`
        const response = await fetch(url, {
            'method': 'POST',
            headers: headers,
            body: JSON.stringify({ path, page, per_page })
        })
        const data = await response.json()
        return res.json(data)
    } catch (error: any) {
        console.log(error);
        return res.json({ code: 500, message: error.message })
    }
})

router.post('/getFileContent', async (req, res) => {
    let { path } = req.body

    path = join(ROOT_PATH, path)

    try {
        const url = `${host}/api/fs/get`
        const response = await fetch(url, {
            'method': 'POST',
            headers: headers,
            body: JSON.stringify({ path })
        })
        const data = await response.json()
        return res.json(data)
    } catch (error: any) {
        console.log(error);
        return res.json({ code: 500, message: error.message })
    }
})

router.post('/getSiteName', async (req, res) => {
    const name = process.env.SITE_NAME || '小莫的云网盘'
    return res.json({ code: 200, data: name })
})

export default router;
