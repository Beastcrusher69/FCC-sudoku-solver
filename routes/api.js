'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  

  app.route('/api/check')
    .post((req, res) => {

      let {
        puzzle,
        coordinate,
        value
      } = req.body ; 
      let regex = /[^1-9\.]/;  
      

      if(regex.test(puzzle)){
      res.json({ error: 'Invalid characters in puzzle' });
        return ;
    }  
      
    if(puzzle.length !== 81){
      res.json({ error: 'Expected puzzle to be 81 characters long' });
        return ;
      
    }  

      if(!puzzle || !coordinate || !value){
        res.json({ "error": "Required field(s) missing" });
        return ;
        
      }

      let row = coordinate.split('')[0];
      let col = coordinate.split('')[1];
      let rowRegex = /[a-z]/i ;
      let colRegex = /[1-9]/  ;

      console.log(row);
      console.log(col);
      
      console.log(rowRegex.test(row));
      console.log(colRegex.test(col));
      

      if( !rowRegex.test(row) || !colRegex.test(col)){
        res.json({ "error": "Invalid coordinate" });
        return ;
      }

      if(!colRegex.test(value)){
        res.json({ error: 'Invalid value' });
        return ;
      }

      let validRow = solver.checkRowPlacement(puzzle, row, col, value);
      let validCol = solver.checkColPlacement(puzzle, row, col, value);
      let validRegion = solver.checkRegionPlacement(puzzle, row, col, value);

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
    let regex = /[^1-9\.]/;  
      

    if(!puzzle){
      res.json({ error: 'Required field missing' });
      return; 
    }  

      console.log(regex.test(puzzle));
    if(regex.test(puzzle)){
      res.json({ error: 'Invalid characters in puzzle' });
      return; 
      
    }  
      
    if(puzzle.length !== 81){
      res.json({ error: 'Expected puzzle to be 81 characters long' });
      return; 
      
    }  

      let solution = solver.solve(puzzle);
    if (!solution) return res.json({ "error": "Puzzle cannot be solved" });

     res.json({ solution : solution}) ;
    });
};
