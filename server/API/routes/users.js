const router = require('express').Router();
const chalk = require('chalk');
const { requireToken, isAdmin } = require('../authMiddleware');
const {
  User,
  Product,
  Cart,
  Wishlist,
  Shipping,
  Payment,
} = require('../../DB');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  // fetch all users info (ADMIN ONLY)
  // any includes? payments/shipments? cart? wishlists?
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageURL, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      imageURL: imageURL || 'Default-Avatar.svg',
      password,
    });
    if (newUser.id) {
      res
        .status(201)
        .send({ token: await User.authenticate({ email, password }) });
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;

    // if user is not admin & they're attempting to pull someone else's data, fail w/403
    if (req.user.id === +userId || req.user.isAdmin) {
      const user = await User.findByPk(+userId, {
        include: [Product, Shipping, Payment],
        attributes: { exclude: ['password'] },
      });
      res.status(200).send(user);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', requireToken, async (req, res, next) => {
  const userId = +req.params.userId;

  // if user is not an admin & they're attempting to change someone else's user data, fail w/403
  if (userId !== req.user.id && !req.user.isAdmin) {
    return res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
  }

  try {
    const { firstName, lastName, email, imageURL, password, isAdmin, role } =
      req.body;

    // if user is not an admin, but they're attempting to set new role or isAdmin, fail w/ 403

    if (role && !req.user.isAdmin && (role !== req.user.role || isAdmin)) {
      return res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }

    // if we've made it this far we're safe to proceed
    const user = await User.findByPk(userId);

    await user.update({
      firstName,
      lastName,
      email,
      imageURL,
      password,
      role,
      isAdmin,
    });

    // pull user from the database again to include all updates
    // (and to prevent sending back password)
    return res.status(200).send(
      await User.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
      })
    );
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Email address already exists');
    } else {
      next(err);
    }
  }
});

router.delete('/:userId', requireToken, async (req, res, next) => {
  const userId = +req.params.userId;

  // if user is not admin & they're attempting to delete someone else's user, fail w/403
  if (req.user.id !== userId && !req.user.isAdmin) {
    return res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
  }

  try {
    await User.destroy({ where: { id: userId } });
    res.sendStatus(204); // 204 no data (successful delete)
  } catch (err) {
    next(err);
  }
});

/**
 * WISHLIST
 */

router.get('/:userId/wishlists', requireToken, async (req, res, next) => {
  const userId = +req.params.userId;
  // if user is not admin & they're attempting to delete someone else's user, fail w/403
  if (req.user.id !== userId && !req.user.isAdmin) {
    return res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
  }
  try {
    const user = await User.findByPk(userId);
    const wishlists = await user.getWishlists({ include: [Product] });
    res.status(200).json(wishlists);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:userId/wishlists/:wishlistId',
  requireToken,
  async (req, res, next) => {
    try {
      if (req.user.id === +req.params.userId || req.user.isAdmin) {
        const wishlistId = +req.params.wishlistId;

        const wishlist = await Wishlist.findByPk(wishlistId, {
          include: [Product],
        });

        if (wishlist) return res.status(200).json(wishlist);
      } else {
        res
          .status(403)
          .send(
            'Inadequate access rights / Requested user does not match logged-in user'
          );
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post('/:userId/wishlists', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === +req.params.userId || req.user.isAdmin) {
      const userId = +req.params.userId;
      const { wishlistName } = req.body;

      const newWishlist = await Wishlist.create({ userId, wishlistName });
      res.status(200).json(newWishlist);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:userId/wishlists/:wishlistId',
  requireToken,
  async (req, res, next) => {
    try {
      if (req.user.id === +req.params.userId || req.user.isAdmin) {
        const wishlistId = +req.params.wishlistId;
        const { productId, action } = req.body; // action: ['add', 'delete']

        let wishlist = await Wishlist.findByPk(wishlistId);

        if (action === 'add') {
          await wishlist.addProduct(productId);
        } else if (action === 'delete') {
          await wishlist.removeProduct(productId);
        }

        const updatedWishlist = await Wishlist.findByPk(wishlistId, {
          include: [Product],
        });

        res.status(200).json(updatedWishlist);
      } else {
        res
          .status(403)
          .send(
            'Inadequate access rights / Requested user does not match logged-in user'
          );
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:userId/wishlists/:wishlistId',
  requireToken,
  async (req, res, next) => {
    try {
      if (req.user.id === +req.params.userId || req.user.isAdmin) {
        const wishlistId = +req.params.wishlistId;
        const wishlist = await Wishlist.findByPk(wishlistId);
        await wishlist.destroy();
        res.sendStatus(204);
      } else {
        res
          .status(403)
          .send(
            'Inadequate access rights / Requested user does not match logged-in user'
          );
      }
    } catch (err) {
      next(err);
    }
  }
);

// CART ROUTES

// GET cart product info
router.get('/:id/cart', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id || req.user.isAdmin) {
      const cart = await User.findByPk(req.params.id, {
        include: Product,
        attributes: {
          exclude: [
            'password',
            'imageURL',
            'isAdmin',
            'role',
            'createdAt',
            'updatedAt',
          ],
        },
      });
      res.json(cart);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING USER CART'));
    next(e);
  }
});

// PUT - update cart-item qty (front-end track qty and submit new qty)
router.put('/:id/cart', requireToken, async (req, res, next) => {
  try {
    const itemQty = req.body.qty || 1;

    if (req.user.id === +req.params.id || req.user.isAdmin) {
      let cartItem = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.body.productId,
        },
      });

      if (!cartItem) {
        const user = await User.findByPk(req.params.id);
        cartItem = await user.addProduct(req.body.productId);
      } else await cartItem.update({ qty: itemQty });

      res.json(cartItem);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE UPDATING USER CART ITEMS'));
    next(e);
  }
});

// DELETE - remove cart items (frontend - when qty is 0, user removes from cart, and when user completes an order)
router.delete('/:id/cart', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id || req.user.isAdmin) {
      const cartItem = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.body.productId,
        },
      });
      if (!cartItem) return res.status(404).send('No product to delete!');
      await cartItem.destroy();
      res.json(cartItem);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE DELETING USER CART ITEMS'));
    next(e);
  }
});

module.exports = router;
