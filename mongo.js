const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give at least password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.2xgyc.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url)



const personSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {

    console.log("phonebook:")

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else {

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date()
})

person.save().then(result => {
console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
mongoose.connection.close()
})

}
