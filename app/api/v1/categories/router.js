const express = require('express')
const router = express()
const { create, index, find, update, deleteCategories } = require('./controller')

router.get('/categories', index)
router.get('/categories/:id', find)
router.put('/categories/:id', update)
router.delete('/categories/:id', deleteCategories)
router.post('/categories', create)

module.exports = router