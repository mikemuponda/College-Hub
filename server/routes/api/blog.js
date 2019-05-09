const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

const bodyParser = require("body-parser")

const app = express()

const loadArticles = async function() {
    try {
        const client = await mongodb.MongoClient.connect(process.env.database, { useNewUrlParser: true })
        return client.db('collegehub').collection('Articles')
    } catch (e) {
        console.log(e);
    }
}

// Add an article
router.post('/api/article', async(req, res) => {
    const article = await loadArticles()
    await article.insertOne(req.body, function(err, response) {
        if (err)
            return res.status(401).json({ message: 'Error Adding an article' })
        else {
            return res.json(response.ops)
        }
    })
})

//Get All Articles
router.get('/api/allarticles', async(req, res) => {
    const articles = await loadArticles()
    return res.send(await articles.find({}).toArray())
})

export default {
    path: '/blog',
    handler: router
}