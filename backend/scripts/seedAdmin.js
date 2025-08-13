const Admin = require('../models/admin.model');

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });

    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin@123', // The password will be hashed by the pre-save hook in the model
      });
      console.log('Default admin created.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

module.exports = seedAdmin;