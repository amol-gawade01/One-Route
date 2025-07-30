const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   
    firstName:{
            type:String,
            require:true,
            minlength:[3,'Expecting minimum length of 3 characters'],
            unique:true
        },
    lastName:{
            type:String,
            minlength:[3,'Expecting minimum length of 3 characters']
        },
    password:{
        type:String,
        require:true,
        minlength:[5,'Expecting a 5 character Password'],
        select:false
    },
    email:{
      type:String,
      require:true,
      unique:true
    },
    socketID:{
        type:String
    }
})


userSchema.methods.generateAuthToken = function () {
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

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User',userSchema)

module.exports = userModel;