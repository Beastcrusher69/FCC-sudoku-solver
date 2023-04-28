'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  let regex = /^1-9\./;  
  

  app.route('/api/check')
    .post((req, res) => {

      let {
        puzzle,
        coordinate,
        value
      } = res.body ; 

      if(regex.test(puzzle)){
      res.json({ error: 'Invalid characters in puzzle' });
    }  
      
    if(puzzle.length !== 81){
      res.json({ error: 'Expected puzzle to be 81 characters long' });
    }  

      if(!puzzle || !coordinate || !value){
        res.json({ "error": "Required field(s) missing" });
      }

      let row = coordinate.split('')[0];
      let col = coordinate.split('')[0];

      if( !/[a-z]/i.test(row) || !/[1-9]/.test(col)){
        res.json({ "error": "Invalid coordinate" });
      }

      if(!/[1-9]/.test(value)){
        res.json({ error: 'Invalid value' });
      }

      let validRow = checkRowPlacement(puzzleString, row, column, value);
      let validCol = checkColPlacement(puzzleString, row, column, value);
      let validRegion = checkRegionPlacement(puzzleString, row, column, value);

      if(validRow && validCol && validRegion){
        res.json({ valid : "true"});
      }

      conflict = [];
      if(!validRow){
        conflict.push('row');
      }

      if(!validCol){
        conflict.push('col');
      }
      
      if(!validRegion){
        conflict.push('region');
      }

      res,json({ valid : 'false' , conflict})

    });
    
  app.route('/api/solve')
    .post((req, res) => {

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
