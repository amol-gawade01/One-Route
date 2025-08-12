const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const captainSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, 'Expecting minimum length of 3 characters'],
    unique: true
  },
  lastName: {
    type: String,
    minlength: [3, 'Expecting minimum length of 3 characters']
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Expecting a 5 character Password'],
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  socketID: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long']
    },
    plate: {
      type: String,
      required: true,
      minlength: [5, 'Plate number must be at least 5 characters long']
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto']
    }
  },
  location: {
    lat: Number,
    long: Number
  }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName
        },
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    );

    return token;
};

captainSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

module.exports =  mongoose.model("Captain",captainSchema);