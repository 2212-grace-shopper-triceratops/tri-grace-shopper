// Import models here
const db = require('./server/DB/database');
const {
  Cart,
  Currency,
  Order_Detail,
  Order,
  Payment,
  Product,
  Promo_Code,
  Shipping,
  Tag,
  User,
  Wishlist,
} = require('./server/DB/');
const currencyList = require('./Mock-data/seedCurrency');
const usersList = require('./Mock-data/userData');

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('syncing the database');

    /**
     * SEED CURRENCIES
     */
    console.log('Seeding currencies...');
    const seededCurrencies = await Currency.bulkCreate(currencyList, {
      validate: true,
    });
    console.log('Currency seeding successful');

    /**
     * SEED USERS
     */
    console.log('Seeding users...');
    const seededUsers = await User.bulkCreate(usersList);
    console.log('User seeding successful');

    /**
     * SEED PAYMENT METHODS
     */

    /**
     * SEED SHIPPING ADDRESSES
     */

    /**
     * SEED TAGS
     */

    /**
     * SEED PRODUCTS
     * (include tags)
     */

    /**
     * SEED CARTS
     * (include users, products)
     */

    /**
     * SEED WISHLISTS
     * (include users, products)
     */

    /**
     * SEED PROMO CODES
     */

    /**
     * SEED ORDER / DETAILS
     * (include users,
     * products,
     * promos,
     * currencies,
     * payment,
     * shipping)
     */

    db.close();
  } catch (e) {
    console.log(e);
    db.close();
  }
};

seed();
