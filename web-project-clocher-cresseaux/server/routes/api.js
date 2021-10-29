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
  password: 'EmmaNico', /*Change this line with your personnal password */
  database: 'Project' /* if you called the database with a different name, change it here */
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
 * GIVES THE LIST OF THE CART.
 */
router.get('/panier', (req, res) => {
  res.json(req.session.panier);
})


/* DONE : ADD A CAT */

router.post("/panier", (req, res) => {
  let panier = req.session.panier;
  const id = parseInt(req.body.id);
  const day = parseInt(req.body.day);


  if (isNaN(id)) {
    res.status(400).json({
      message: "Bad argument"
    });
  } else {
    const catPanier = panier.cats.find((a) => a.id === id);
    if (!catPanier) {
      const newcat = {
        id: id,
        day: parseInt(day),
      };

      if (req.session.userID === undefined) {
        res.status(400).json({
          message: "The user has to be connected !"
        })
        return
      } else {
        panier.cats.push(newcat);
        res.status(201).json(newcat);
      }
    } else {
      res.status(400).json({
        message: "This cat has already been added"
      });
    }
  }
});



/* DONE : CHANGE DATES */

router.put("/panier/:catId", (req, res) => {

  const id = parseInt(req.params.catId);
  const day = parseInt(req.body.day);
  const panier = req.session.panier;

  let catpanier = panier.cats.find((a) => a.id === id);

  catpanier.day = day;
  res.json(panier);

});

/* DONE : DELETE A CAT FROM THE PANIER */

router.delete("/panier/:catId", (req, res) => {
  let panier = req.session.panier;
  const catId = parseInt(req.params.catId);
  const indexToFind = panier.cats.findIndex((a) => a.id === catId);

  if (isNaN(catId)) {
    res.status(400).json({
      message: "Bad argument"
    });
  } else if (indexToFind != -1) {
    panier.cats.splice(indexToFind, 1);
    res.json(panier);
  } else {
    res.json({
      message: "This cat has not been added"
    });
  }
  res.json(panier);
});


router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = "SELECT * FROM users WHERE email =$1"

  var result = await client.query({
    text: sql,
    values: [email]
  })

  console.log('result.rows', result.rows);

  if (result.rowCount !== 0) {
    res.status(400).json({
      message: 'bad request'
    });
    return;
  }


  const hash = await bcrypt.hash(password, 10)

  const sql1 = "INSERT INTO users (email, password) VALUES ($1, $2)"

  await client.query({
    text: sql1,
    values: [email, hash]
  })

  res.json({
    message: "Now, you are well registered"
  });

});


async function check(email) {
  const sql = "SELECT * FROM users WHERE email=$1";
  return await client.query({
    text: sql,
    values: [email],
  });
}

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  check(email).then(async (resultat) => {
    if (resultat.rowCount === 0) {
      res.status(400).json({
        message: "This email doesn't exist"
      });
      return;
    } else {
      const user = resultat.rows[0];
      const hashPassword = user.password;

      if (await bcrypt.compare(password, hashPassword)) {
        if (req.session.userID === user.id) {
          res.status(401).json({
            message: "Already connected"
          });
        } else {
          req.session.userID = user.id;
          res.json({
            message: "Connected"
          });
        }
      } else {
        res.status(400).json({
          message: "Wrong password"
        });
      }
    }
  });
});

router.post('/panier/confirm', (req, res) => {
  
  if (req.session.userID === undefined){
    res.status(401).json({message : "You are not logged in"})
  } else {
    req.session.panier.cats.splice(0,req.session.panier.cats.length);
    res.json({message: "Thank you for your purchase ! Don't forget to come get your kitties ! "});
    res.send();
  }
  

})


module.exports = router