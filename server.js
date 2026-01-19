import express from 'express'
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = [];

app.get('/usuarios', async (request, response) => {
  let users = [];
  if (request.query) {
    users = await prisma.user.findMany({
      where: {
        name: request.query.name,
        age: request.query.age,
        email: request.query.email
      }
    })
  }else {
    users = await prisma.user.findMany()
  }
  
  response.status(200).json(users);

})

app.post('/usuarios', async (request, response) => {

  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age
    }
  })
  response.status(201).json(users)

})

app.put('/usuarios/:id', async (request, response) => {

  await prisma.user.update({
    where: {
      id: request.params.id
    },
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age
    }
  })
  response.status(201).json(users)

})

app.delete('/usuarios/:id', async (request, response) => {

  await prisma.user.delete({
    where: {
      id: request.params.id
    }
  })
  response.status(201).json(users)
})


app.listen(3000)




//app.post('/usuarios')
//app.put('/usuarios')
//app.delete('/usuarios')


//senha DB ***
//usuário DB ***