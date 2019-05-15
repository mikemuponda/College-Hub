const express = require('express')
require('dotenv').config()
const mongodb = require('mongodb')
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/google/signup', async (req, res) => {
	res.status(200).json({
		message: 'OK'
	})
})

//Load Chats From MongoDB
const loadChats = async function () {
  try{
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('userMessages')
  }catch(e){
    console.log(e);
  }
}

//Save a Message
router.post('/update', async (req, res) => {
	const chats = await loadChats()
	var chatRoom, temp = []
	if (chatRoom = await chats.findOne({chatRoomID: req.body.chatRoomID})) {
		temp = chatRoom.conversation
		temp.push(req.body)
		let params = {conversation: temp}
		var activeChat = true, index
		for(index in chatRoom.users){
			if(chatRoom.users[index] == ''){
				activeChat = false
			}
		}
		if(activeChat == true){
			await chats.findOneAndUpdate(
				{chatRoomID: req.body.chatRoomID},
				{$set: Object.assign(params)},
				{upsert: true}
			)
			return res.json(await chats.findOne({chatRoomID: req.body.chatRoomID}))
		}else{
			await chats.deleteOne({chatRoomID: req.body.chatRoomID})
			let params = {
				chatRoomID: req.body.chatRoomID,
				users: [req.body.sender, req.body.receiver],
				conversation: [req.body],
				createdAt: req.body.createdAt
			}
			if(req.body.sender != '' && req.body.receiver != ''){
				await chats.insertOne(params)
				return res.json(await chats.findOne({chatRoomID: req.body.chatRoomID}))
			}else{
				res.status(201).json({
					message: 'Chat Room ' + req.body.chatRoomID + ' has been deleted because there was only one user in it'
				})
			}
			
			
		}
	}else{
		let params = {
			chatRoomID: req.body.chatRoomID,
			users: [req.body.sender, req.body.receiver],
			conversation: [req.body],
			createdAt: req.body.createdAt
		}
		if(req.body.sender != '' && req.body.receiver != ''){
			await chats.insertOne(params)
		}
		return res.json(await chats.findOne({chatRoomID: req.body.chatRoomID}))
	}
})

//Get Chats By User
router.post('/user/:id', async (req, res) => {
	const chats = await loadChats()
	var allChats = await chats.find({}).toArray()
	var index, j, userChatsRooms = []
	for(index in allChats){
		for(j in allChats[index].users){
			if(allChats[index].users[j] == req.params.id){
				userChatsRooms.push(allChats[index])
			}
		}
	}
  return res.send(userChatsRooms)
})

//Get All Chats
router.post('/allchats', async (req, res) => {
  const chats = await loadChats()
  res.send(await chats.find({}).toArray())
})

//Delete Chat by Room
router.delete('/delete/:id', async (req, res) => {
  const chats = await loadChats()
  await chats.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(201).json({
    message: req.params.id + ' has been deleted'
  })
})

export default {
  path: '/chats',
  handler: router
}