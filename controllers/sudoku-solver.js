class SudokuSolver {

  letterToNumber(letter){

    let letter2 = letter.toLowerCase();
    switch(letter2){
      case 'a':
       return 1; 
      case 'b':
       return 2;
      case 'c':
       return 3; 
      case 'd':
       return 4; 
      case 'e':
       return 5;
      case 'f':
       return 6; 
      case 'g':
       return 7; 
      case 'h':
       return 8;
      case 'i':
       return 9;   
    }
  }
  
  transform(puzzleString) {
    let grid = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      
    ]

    let c = 0 ; 

    for(let i=0 ; i< 9 ; i++){
      for (let j=0 ; j<9 ; j++){
        grid[i][j] = puzzleString[c] === '.' ? 0 : +puzzleString[c];

        c++ ;
      }
    }

    return grid;
  }

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, col, value) {

    let grid = this.transform(puzzleString);
     row = this.letterToNumber(row);

    for(let i=0 ; i<9 ; i++){
      if(grid[row-1][i] === value){
        return false ;
      }
    }
    return true ;
  }

  checkColPlacement(puzzleString, row, col, value) {
     let grid = this.transform(puzzleString);

   for(let i=0 ;i<9 ; i++){
     if( grid[i][col-1] === value){
      return false ;
    }
   }
    return true ; 
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
     row = this.letterToNumber(row);

    if(grid[row-1][col-1] !== 0){
      return false ;
    
    }
    let startRow = row -(row % 3),
        startCol = col- ( col % 3);

    for( let i =0 ; i< 3 ; i++){
      for (let j=0 ; j< 3 ; j++){
        if(grid[i + startRow][j + startCol] == value) return false ;
      }
    }
    return true ;
    
    
  }

  isSafe(grid, row,  col, num)
    {
  
        for (let x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;
  
        for (let x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;
  
      
        let startRow = row - row % 3, startCol
                                      = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;
  
        return true;
    }

 solveSudoku(grid, row, col)
    {
        if (row == 9 - 1 && col == 9)
            return true;

        if (col == 9) {
            row++;
            col = 0;
        }
 
        if (grid[row][col] != 0)
            return this.solveSudoku(grid, row, col + 1);
  
        for (let num = 1; num < 10; num++) {

            if (this.isSafe(grid, row, col, num)) {

                grid[row][col] = num;

                if (this.solveSudoku(grid, row, col + 1))
                    return true;
            }
    
            grid[row][col] = 0;
        }
        return false;
    }

  transformBack(grid){

    return grid.flat().join('');
  }

  solve(puzzleString) {

    let grid = this.transform(puzzleString);

    let solved = this.solveSudoku(grid, 0, 0) ;
    
    
    if(!solved){
      return false ;
    }

    let solvedString = this.transformBack(grid);
    return solvedString;
    
    }
  
}

module.exports = SudokuSolver;

