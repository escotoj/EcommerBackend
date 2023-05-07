const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Product.findAll({
      include: [
      {
        Model: Product,
        attributes: ['id', 'category_id'],
      }
    ]
  });
    const categories = categoryData.map(category => category.get({plain: true}));
    res.render('categories', {
      sentence: 'These are all the categories and their associated products.',
      categories
    });
  } catch (error) {
    res.status(500).json({error});
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
Category.findOne({
  where: {
    id: req.params.id,
    },
  include: [
    {
      Model: Product,
      attributes: ['id', 'category_id'],
    }
  ]
})
.then((category) => {
  if (!category) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }
  res.status(200).json(category);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    console.log(req.body);
const categoryData = await Category.create(req.body);
res.json({categoryData})
} catch (err) {
    res.status(500).json(err)    
}
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
