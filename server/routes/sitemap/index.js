const express = require('express')
const mongodb = require('mongodb')
const sitemap = require('sitemap')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

const loadUsers = async function () {
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('users')
}

const loadHouses = async function () {
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('houses')
}

let sitemapData;
router.get('/sitemap.xml', async (req, res) => {
	const users = await loadUsers()
	const houses = await loadHouses()
	var allUsers = await users.find({}).toArray()
	var allHouses = await houses.find({}).toArray()
	var routes = []
	var routeObject = {}

	routes.push({url: '/', changefreq: 'weekly', priority: 1})
	routes.push({url: '/services', changefreq: 'weekly', priority: 0.9})
	routes.push({url: '/accommodation/find', changefreq: 'weekly', priority: 0.9})
	routes.push({url: '/taxi/find', changefreq: 'weekly', priority: 0.9})
	routes.push({url: '/restaurants/find', changefreq: 'weekly', priority: 0.9})
	routes.push({url: '/events/find', changefreq: 'weekly', priority: 0.9})
	routes.push({url: '/marketplace/products-and-services', changefreq: 'weekly', priority: 0.9})

	routes.push({url: '/accommodation/list', changefreq: 'weekly', priority: 0.8})
	routes.push({url: '/restaurants/list', changefreq: 'weekly', priority: 0.8})
	routes.push({url: '/taxi/list', changefreq: 'weekly', priority: 0.8})
	routes.push({url: '/events/list', changefreq: 'weekly', priority: 0.8})
	routes.push({url: '/marketplace/list-products-and-services', changefreq: 'weekly', priority: 0.8})

	routes.push({url: '/about', changefreq: 'weekly', priority: 0.8})
	routes.push({url: '/create-account', changefreq: 'weekly', priority: 0.8})


	for (var i = 0; i < allHouses.length; i++) {
		routeObject = {
			url: '/accommodation/view/' + allHouses[i]._id,
			changefreq: 'daily',
			lastmodrealtime: true,
			priority: 0.8
		}
		routes.push(routeObject);
	}

	routes.push({url: '/contact', changefreq: 'weekly', priority: 0.7, lastmodrealtime: true})

	for (var i = 0; i < allUsers.length; i++) {
		routeObject = {
			url: '/profile/' + allUsers[i].username,
			changefreq: 'daily',
			lastmodrealtime: true,
			priority: 0.7
		}
		routes.push(routeObject);
	}

	routes.push({url: '/team', changefreq: 'weekly', priority: 0.7})
	routes.push({url: '/forgot-password', changefreq: 'weekly', priority: 0.6})
	routes.push({url: '/privacy-policy', changefreq: 'weekly', priority: 0.6, lastmodrealtime: true})
	routes.push({url: '/terms-and-conditions', changefreq: 'weekly', priority: 0.6, lastmodrealtime: true})

	sitemapData = sitemap.createSitemap ({
		hostname: 'https://www.collegehub.co.zw',
		cacheTime: 600000,        // 600 sec - cache purge period 
		urls: routes
	})

	fs.writeFile("assets/sitemap.xml", sitemapData, function(err) {
    if(err) {
      return console.log(err)
    }
	})

  sitemapData.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
	})
})


export default {
  path: '/',
  handler: router
}