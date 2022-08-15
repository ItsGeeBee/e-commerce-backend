const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => { // Get all tags from the tag table
  Tag.findAll(
    {
    attributes: ["id", "tag_name"],
    include: [{ model: Product, 
    through: ProductTag }],
    }
  )
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({ // Gets the tag based on the ID given in the request parameters
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create( // Create a new tag 
    {
      tag_name: req.body.tag_name // required parameters 
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json(err);
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update tag data
 Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json(err);
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { // Selects tag based on 
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) { // If ID of tag can't be found, return message 
        res.status(404).json({ message: 'No Tag found by that ID.' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => { // If error log error
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
