const name = 'Nicolas'
const userAge = 18

const user = {
  name,
  age: userAge,
  location: 'Ermont'
}

console.log(user)

//

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 150,
  salePrice: undefined
}

console.log({...product})


//

const transaction = (type, {...myProduct}) => {
  console.log(type)
  console.log(myProduct)
}

transaction('order', product)
