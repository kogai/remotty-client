import Promise from 'bluebird';
import { typeCheck } from 'type-check';
import { connection } from 'src/classes/Databases';

class User {
	constructor(){

		this.schema = {
			name: String,
			iconFilePath: String,
			teams: Array
		};
	}
}

export default User;

export function UserModel(done){
	connection(window)
	.then((transaction)=>{

	})
	.catch((error)=>{

	});
	// return new User();
}

/*
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { mongodb } from '../credential.js';
import Team from './Team';

const SALT_WORK_FACTOR = 10;
let db = mongoose.createConnection(mongodb);

let UserSchema = new mongoose.Schema({
	name: String,
  mail: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  iconFileName: String,
  verifyToken: String,
  isVerify: Boolean,
	teams: Array
});

UserSchema.methods.comparePassword = function(candidatePassword, hashedPassword, done) {
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
	var _user = this;

	// only hash the password if it has been modified (or is new)
	if (!_user.isModified('password')){
    return next();
  }

	let genSalt = Promise.promisify(bcrypt.genSalt);
	let genHash = Promise.promisify(function(salt, done){
		// bcrypt.hashをラップして任意の引数を渡す
		bcrypt.hash(_user.password, salt, function(err, hash){
			if(err){
				done(err);
			}
			_user.password = hash;
			done(null, hash);
		});
	});

	genSalt()
	.then(genHash)
	.done(next);
});

let UserModel = db.model('user', UserSchema);
export default UserModel;
*/
