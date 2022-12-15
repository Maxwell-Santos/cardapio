import mongoose from 'mongoose'

export default async function handlerConnectDatabase(){
  const uri = `mongodb+srv://max:${process.env.NEXT_PASSWORD_DATABASE}@listfoodrequest.ttyq8xs.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set("strictQuery", true)
  
  await mongoose.connect(uri)
}
  