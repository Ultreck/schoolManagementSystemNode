const { genSalt, hash } = require('bcrypt');
const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
      firstname:{
            type:String,
            require:true
      },
      lastname:{
            type:String,
            require:true
      },
      email:{
            type:String,
            unique:true,
            require:true
      },
      password:{
            type:String,
            require:true,
      },
      gender:{
            type:String,
            require:true
      },
      time:{
            type: Date,
           default:Date.now()
      },
      contact:{
            type: String,
           require
      },
      address:{
            type: String,
           require
      },
      city:{
            type: String,
           require
      },
      country:{
            type: String,
           require
      },
      courses:{
            type: String,
           require
      },
      faculty:{
            type: String,
           require
      },
      level:{
            type: String,
           require
      },
      matric:{
            type: String,
           require
      },
      program:{
            type: String,
           require
      },
      region:{
            type: String,
           require
      },
});

studentsSchema.pre('save', async function(){
      const {password} = this;

      try{
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            this.password = hashedPassword;
      }catch(err){
            console.log(err);
      }
});

const Student = mongoose.model("Students", studentsSchema);
module.exports = Student;