const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryRoutes = await Category.findAll ({
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
  const categoryRoutes = await Category.findOne({
    where: { 
      id: req.params.id
    }, 
    include: {
      model: Product,
      attributes: ['category_id']
    }
  });
  res.status(200).json(categoryRoutes);
} catch (err) {
  res.status(500).json(err);
}
});
// POST a new category
router.post('/', async (req, res) => {
  try{
    const categoryRoutes = await Category.create({
    category_name: req.body.category_name
  });
res.status(200).json(categoryRoutes);
} catch (err) {
res.status(400).json(err);
}
});


router.put('/:id', async (req, res) => {
  try{
  const categoryRoutes = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
  res.status(200).json(categoryRoutes);
} catch (err) {
  res.status(400).json({ message: 'No category found with that id!' });
}
});

// DELETE a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
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
