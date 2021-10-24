const express = require('express')
const router = express.Router()
const cats = require('../data/cats.js')

class Panier {
  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.cats = []
  }
}



const bcrypt = require('bcrypt')
const {
  Client
} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'LouisNico',
  database: 'Project'
})

client.connect()


router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/**
 * Getting all the cats :
 */
router.get('/cats', (req, res) => {
  res.json(cats)
})

/*
 * GIVES THE LIST OF THE PANIER.
 */
router.get('/panier', (req, res) => {
  res.json(req.session.panier);
})


module.exports = router