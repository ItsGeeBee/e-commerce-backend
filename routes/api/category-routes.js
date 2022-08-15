const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => { // Get all categories from the category table
  try {
    const categoryRoutes = await Category.findAll ({ // Store the categoryData in a variable once the promise is resolved
    include: {
    model: Product,
      attributes: ['product_name']
    	}
    });
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET one category by id

router.get('/:id', async (req, res) => {
 try{
  const categoryRoutes = await Category.findOne({ // Store the categoryData in a variable once the promise is resolved
    where: {  // Gets the categories based on the ID given in the request parameters
      id: req.params.id
    }, 
    include: {
      model: Product,
      attributes: ['category_id']
    }
  });
  // 200 status code means the request is successful
  res.status(200).json(categoryRoutes);
} catch (err) {
  res.status(500).json(err);
}
});
// POST a new category
router.post('/', async (req, res) => {
  try{
    const categoryRoutes = await Category.create({ // Store the categoryData in a variable once the promise is resolved
    category_name: req.body.category_name
  });
  // Send the newly created row as a JSON object
res.status(200).json(categoryRoutes);
} catch (err) {
res.status(400).json(err);
}
});


router.put('/:id', async (req, res) => {
  try{
  const categoryRoutes = await Category.update({  // Store the categoryData in a variable once the promise is resolved
     
    category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
  res.status(200).json(categoryRoutes); // 200 status code means the request is successful
} catch (err) {
  res.status(400).json({ message: 'No category found with that id!' });
}
});

// DELETE a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { // what parameters are needed to make the call 
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) { // if category cannot be found with that ID, return message 
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
