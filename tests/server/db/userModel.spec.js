/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */
const {
  models: { User },
} = require('../../../server/db/models/associations');
const { db, initDB } = require('../../../server/db/index');

let user;

beforeAll(async () => {
  await initDB();

  user = await User.create({
    email: 'blabal@yahoo.com',
    password: 'bcrypt',
    firstName: 'John',
    lastName: 'Doe',
    address: '1234 Cherry St',
  });
});

afterAll(() => {
  db.close();
});

it('User model exists', (done) => {
  expect(user.email).toEqual('blabal@yahoo.com');
  done();
});

it('User email is valid email', async (done) => {
  try {
    const newUser = await User.create({
      email: 'blabalyahoo.com',
      password: 'bcrypt',
      firstName: 'John',
      lastName: 'Doe',
      address: '1234 Cherry St',
    });

    newUser.validate();
  } catch (error) {
    expect(error.message).toBe('Validation error: Validation isEmail on email failed');
  }
  done();
});
