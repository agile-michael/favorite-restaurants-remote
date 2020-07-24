// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

const app = express()
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // console.log(restaurants)
  res.render('index', { restaurants: restaurants.results })
})

app.get('/search', (req, res) => {
  let keyword = ""
  if ((keyword = req.query.keyword.trim()) === "") return
  keyword = keyword.toLowerCase()
  console.log(`keyword = ${keyword}`)
  const searches = restaurants.results.filter((restaurant) => {
    return (restaurant.name.toLowerCase().includes(keyword) || 
          restaurant.name_en.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword))
  })
  res.render('index', { restaurants: searches, keyword: req.query.keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log(req.params)
  // console.log('restaurant_id', req.params.restaurant_id)
  const restaurant = restaurants.results.find(restaurant =>
    restaurant.id === Number(req.params.restaurant_id))

  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
