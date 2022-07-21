window.addEventListener('DOMContentLoaded', () => {
    const announcer = document.querySelector('.announcer');
    const container = document.querySelector('.container');
   
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      container.appendChild(tile);
    }
  
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.display-player');
    const resetBtn = document.querySelector('#reset');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let curPlayer = 'X';
    let game = true;
    let startTile = 4; 

    const xPlayerWin = 'x';
    const yPlayerWin = 'y';
    const lose = 'l'; 

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
  
    function checkWin() {
      let win = false;
      for (let i = 0; i <= 7; i++) {
          const winComb = winCombinations[i];
          const a = board[winComb[0]];
          const b = board[winComb[1]];
          const c = board[winComb[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }else if (a === b && b === c) {
              win = true;
              break;
          }
      }
  
      if (win) {
        announce(curPlayer === 'X' ? xPlayerWin : yPlayerWin);
        game = false;
        return;
      } else if (!board.includes('')){
          announce(lose);
        }
    }
  
    const announce = (type) => {
        switch(type){
            case yPlayerWin:
                announcer.innerHTML = 'Player <span class="playerO">O Won</span>';
                break;
            case xPlayerWin:
                announcer.innerHTML = 'Player <span class="playerX">X Won</span>';
                break;
            case lose:
                announcer.innerText = 'Game over!';
        }
        announcer.classList.remove('hide');
    };
  
    const checkClick = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };
  
    const updBoard = (index) => {
        board[index] = curPlayer;
    }
  
    const changePlayer = () => {
        displayPlayer.classList.remove(`player${curPlayer}`);
        curPlayer = curPlayer === 'X' ? 'O' : 'X';
        displayPlayer.innerText = curPlayer;
        displayPlayer.classList.add(`player${curPlayer}`);
    }
  
    const clickTile = (tile, index) => {
        if(checkClick(tile) && game) {
            tile.innerText = curPlayer;
            tile.classList.add(`player${curPlayer}`);
            updBoard(index);
            checkWin();
            changePlayer();
        }
    }
    
    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        game = true;
        announcer.classList.add('hide');
        startTile = 4;
        if (curPlayer === 'O') {
            changePlayer();
        }
  
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
            tile.classList.remove('active');
        });
    }
  
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => clickTile(tile, index));
    });
  
    resetBtn.addEventListener('click', reset);

    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        move('LEFT');
      } else if (e.key === 'ArrowRight') {
        move('RIGHT');
        } else if (!e.shiftKey && e.key === 'Enter') {
            move('ENTER');
            }
    }
    function move(side) {
        if(side==='RIGHT'){
            if(startTile<8){
                startTile++;
                let previousTile = tiles[startTile-1];
                let currentTile = tiles[startTile];
                currentTile.classList.add('active');
                previousTile.classList.remove('active');                
            }
        }
        if(side==='LEFT'){
            if(startTile>0){
                startTile--;
                let previousTile= tiles[startTile+1]
                let currentTile = tiles[startTile];
                currentTile.classList.add('active');
                previousTile.classList.remove('active');
            }
        }
        if(side==='ENTER'){
            let currentTile = tiles[startTile];
            clickTile(currentTile, startTile);
        }
    }
    
    const avatar = document.querySelectorAll('.avatar-icon');
    const avatarContainer = document.querySelectorAll('.avatar-container');
    let idnumber = 1;
    avatar.forEach(element => {
        element.setAttribute('draggable', 'true'); 
        element.setAttribute('id', `box${idnumber}`); 
        idnumber++;
    });
    avatarContainer.forEach(element => {
        element.setAttribute('data-drop-target', 'true'); 
    });

    
    function handleDragStart(e) {
        e.dataTransfer.setData('text', this.id); 
    }

    function handleOverDrop(e) {
        e.preventDefault(); 
        if (e.type !== 'drop') {
            return; 
        }
        let draggedId = e.dataTransfer.getData('text/plain');
        let draggedEl = document.getElementById(draggedId);
        if (avatarContainer[1].childNodes.length < 1 || avatarContainer[0].childNodes.length < 1) {
            if (draggedEl.parentNode === this) {
                this.className = '';
                return;
            }
            draggedEl.parentNode.removeChild(draggedEl);
            this.appendChild(draggedEl); 
        }
        
    }

    let draggable = document.querySelectorAll('[draggable]')
    let targets = document.querySelectorAll('[data-drop-target]');

    for(let i = 0; i < draggable.length; i++) {
        draggable[i].addEventListener('dragstart', handleDragStart);
    }

    for(let i = 0; i < targets.length; i++) {
        targets[i].addEventListener('dragover', handleOverDrop);
        targets[i].addEventListener('drop', handleOverDrop);
    }
    
});

