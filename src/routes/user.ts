import express from 'express'
import db from "../db";

const app = express.Router()

app.get('/todos', async(req, res) => {
  const datas = await db.todoList.findMany({
    where: { userId: req.body.userId },
  })

  res.status(200).json(datas)
})

app.get('/todo/:uuid', async(req, res) => {

  const todoList = await db.todoList.findUnique({
    where: {
      id: req.params.uuid,
    },
  })

  const todoItems = await db.todoItem.findMany({
    where: {
      todoListId: req.params.uuid,
    },
  })

  let datas = {
    todolist : todoList,
    todoItems : todoItems
  };
  res.status(200).json(datas);
})

app.post('/todo',async (req, res) => {
 
  const datas = await db.todoList.create({
    data: {
      userId: req.user.id,
      name: req.body.username
    }
  })
  res.status(200).json(datas)
})

app.delete('/todo/:uuid', async(req, res) => {

  const datas = await db.todoList.delete({
    where: { id: req.params.uuid },
  })
  res.status(200).json('yyeees')
})

app.put('/todo/:uuid', async(req, res) => {
  const datas = await db.todoList.update({
    where : {id : req.params.uuid},
    data: {
      name: req.body.username,
    }
  })
  res.status(200).json(datas)
})

app.post('/todoItem', async(req, res) => {

  const datas = await db.todoItem.create({
    data: {
      description: req.body.description,
      todoListId: req.body.todoListId
    }
  })
  res.status(200).json(datas)
})

app.put('/todoItem',async (req, res) => {

  const datas = await db.todoItem.update({
    where : {id : req.body.todoItemId},
    data: {
      description: req.body.description,
    }
  })
  res.status(200).json(datas)
})

app.delete('/todoItem/:uuid', async(req, res) => {
  
   await db.todoItem.delete({
    where: { id: req.params.uuid },
  })
  res.status(200).json({message : 'item deleted !'})
})
export default app