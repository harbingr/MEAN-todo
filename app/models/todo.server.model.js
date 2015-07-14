'use strict';
/*http://mongoosejs.com/docs/guide.html*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var tags = new Schema({
	name: String,
	color: String
});

var TodoSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        unique : true,
        required: 'name cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    category : {
    	type: String,
    	default: '',
    	trim: true,
    	unique: false
    },
    tags: [tags],
    weight: Number,
    starred: Boolean,
    done: Boolean

});

var list = new Schema({
	name : String,
	color: String,
	todos: [TodoSchema]
});

//exposing the model to other objects (similar to a 'public' setter)
mongoose.model('TodoTags', tags);
mongoose.model('Todo', TodoSchema);
mongoose.model('TodoList', list);