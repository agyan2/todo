/**
 * @swagger
 * resourcePath: /api/todos
 * description: All about TODO API
 */



//Abhinav Test application

var express = require('express');
var router = express.Router();
    var mongoose = require('mongoose');                     // mongoose for mongodb

   // define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos

/**
 * @swagger
 * path: /api/todos
 * operations:
 *   -  httpMethod: GET
 *      summary: Gets TO DO LIST
 *      notes: Returns list of todo
 *      responseClass: todos
 *      nickname: todos
 *      consumes: 
 *        - text/html
 */
    router.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });



/**
 * @swagger
 * path: /api/todos
 * operations:
 *   -  httpMethod: POST
 *      summary: Creates TO DO LIST
 *      notes: Returns list of todo after creating one
 *      responseClass: todos
 *      nickname: todos
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: text
 *          description: todo value
 *          paramType: body
 *          required: true
 *          dataType: string
 */

    // create todo and send back all todos after creation
    router.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });



/**
 * @swagger
 * path: /api/todos/{todo_id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Deletes TO DO Item
 *      notes: Returns list of todo after creating one
 *      responseClass: todos
 *      nickname: todos
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: todo_id
 *          description: todo id value
 *          paramType: path
 *          required: true
 *          dataType: string
 */
    // delete a todo
    router.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });



module.exports = router;