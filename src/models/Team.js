import mongoose from 'mongoose';
import { mongodb } from '../credential.js';

let db = mongoose.createConnection(mongodb);

let TeamSchema = new mongoose.Schema({
	name: String,
	members: Array
});

let TeamModel = db.model('team', TeamSchema);
export default TeamModel;
