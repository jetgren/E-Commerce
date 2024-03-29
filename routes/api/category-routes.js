const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    Category.findAll({
        include: [{ model: Product }],
    }).then((category) => res.json(category));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Category.findOne({
        include: [{ model: Product }],
        where: { id: id },
    }).then((category) => res.json(category));
});

router.post('/', (req, res) => {
    Category.create(req.body)
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Category.update(req.body, {
        where: {
            id: id,
        },
    })
        .then((data) => res.json(data))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Category.destroy({
        where: { id: id },
    }).then((data) => res.json(data));
});

module.exports = router;