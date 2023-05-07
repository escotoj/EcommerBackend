const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/api/tags', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
      {
        Model: Product,
        attributes: ['id', 'product_name'],
      },
    ]
  });
    const tags = tagData.map(tag => tag.get({plain: true}));
    res.render('tags', {
      sentence: 'These are all the tags and their associated products',
      tags
    });
  } catch (error) {
    res.status(500).json({error});
  }
})

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        Model: Product,
        attributes: ['id', 'product_name'],
      },
    ]
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  })
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
const tagData = await Tag.create(req.body);
res.json({tagData})
} catch (err) {
    res.status(500).json(err)    
}}
);

// NEED TO CHECK ABOVE WORK AND COMPLETE BELOW 

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
