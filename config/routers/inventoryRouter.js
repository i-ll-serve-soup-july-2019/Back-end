const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const middleware = require("../middleware.js");
const authenticate = middleware.authenticate;
const lowInventoryCheck = middleware.lowInventoryCheck;

router
  .use(authenticate)
  .route("/")
  .get((req, res) => {
    db("inventory")
      .then(inventory => {
        res.status(200).json(inventory);
      })
      .catch(err =>
        res.status(500).json({
          error: "There has been a server error for this GET route",
          err
        })
      );
  });

router
  .use(authenticate)
  .route("/")
  .post((req, res) => {
    if (req.body.item) {
      db("inventory")
        .insert(req.body)
        .then(ids => {
          res.status(201).json({
            message: `${req.body.item} has been added to the inventory.`,
            itemId: ids
          });
        })
        .catch(err => {
          es.status(500).json({
            error: "There has been a server error for this POST route",
            err
          });
        });
    } else {
      res.status(400).json({
        error: "You have to include at least a name bruh for the item."
      });
    }
  });

router
  .use(authenticate)
  .route("/:username")
  .get((req, res) => {
    db("inventory")
      .where({ username: req.params.username })
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
        res.status(500).json({
          error: "There has been a server error for this GET route",
          err
        });
      });
  });
router
  .use(authenticate)
  .route("/:username/:id")
  .get((req, res) => {
    db("inventory")
      .where({ username: req.params.username, id: req.params.id })
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
        res.status(500).json({
          error: "There has been a server error for this GET route",
          err
        });
      });
  })
  .put((req, res) => {
    db("inventory")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(201).json({
            message: `${count} record has been updated.`
          });
        } else {
          res.status(404).json({
            error: `The requested ID for this item does not exist on this server. Try again grasshopper.`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There has been a server error for this PUT route",
          err
        });
      });
  })
  .delete((req, res) => {
    db("inventory")
      .where({ id: req.params.id })
      .del()
      .then(count => {
        if (count > 0) {
          res.status(201).json({
            message: `${count} record has been nuked. WELL DONE.`
          });
        } else {
          res.status(404).json({
            error: `The requested ID for this item does not exist on this server. Try again grasshopper.`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There has been a server error for this DELETE route",
          err
        });
      });
  });

module.exports = router;
