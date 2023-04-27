'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    //   let {
    //     puzzle,
    //     coordinate,
    //     value
    //   } = res.body ; 

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    let regex = /^1-9\./;  
    let puzzle = req.body.puzzle;

    if(!puzzle){
      res.json({ error: 'Required field missing' });
    }  

    if(regex.test(puzzle)){
      res.json({ error: 'Invalid characters in puzzle' });
    }  
      
    if(puzzle.length !== 81){
      res.json({ error: 'Expected puzzle to be 81 characters long' });
    }  

      let solution = solver.solve(puzzle);
    if (!solution) return res.json({ "error": "Puzzle cannot be solved" });

     res.json({ solution : solution}) ;
    });
};
