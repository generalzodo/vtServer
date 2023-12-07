import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  dob: {
    type: String
  },

  email: {
    type: String,
  },

  phone: {
    type: String,

  },
  password: {
    type: String,
  },

  reset: {
    type: String,
  },
  bank_name: {
    type: String,
  },
  wallet_balance: {
    type: String,
    default: "0"
  },
  account_number: {
    type: String,
  },
  account_name: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name:{
    type: String,
  },
  device: {
    type: String,
    default: 'web'
  },
  uuid: {
    type: String,
    default: Math.floor(10000000 + Math.random() * 90000000),
    unique: true
  },
  type: {
    type: String,
    default: 'user'
  },

  status: {
    type: String,
    default: 'Active'
  }

}, {
  timestamps: true
});
userSchema.index({ name: -1, email: -1, phone: -1 });

module.exports = mongoose.model('User', userSchema);