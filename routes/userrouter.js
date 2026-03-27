import express from 'express'
import { add, getAllUsers, login, register } from '../controller/usercontroller.js'
const userrouter = express.Router()

userrouter.post('/add', add)
userrouter.post('/register', register)
userrouter.post('/login', login)
userrouter.get('/getAllUsers', getAllUsers)

export default userrouter;
