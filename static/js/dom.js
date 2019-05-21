// It uses data_handler.js to visualize elements

import { dataHandler } from "./data_handler.js";

export let dom = {
    boardWrapper: '#board-container',
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    showBoardHeader: function(board){
        const boardHeader = `
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
        
        `
        return boardHeader;
    },
    showBoardBody: function(){
        const boardBody = `
            <div class="board-columns">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In progress</div>
                    <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content"></div>
                </div> 
            </div> 
        `
        return boardBody;

    },

    loadBoard: function (board_id) {
        dataHandler.getBoard(board_id, function (board_id, board) {
           console.log(board_id, board)
        });
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.clearBoards();
            dom.showBoards(boards);
            dom.loadBoard(1);
            dom.loadBoard(2 );
            dom.loadCards(1)
        });
    },
    clearBoards: function (){
        document.querySelector(this.boardWrapper).innerHTML = " ";
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = [];

        for(let board of boards){
            boardList.push(dom.showBoardHeader(board) + dom.showBoardBody());
        }

        for(let board of boardList) {
            const outerHtml = `
            <section class="board">
                ${board}
            </section>
            `;

            this._appendToElement(document.querySelector(this.boardWrapper), outerHtml);
        }

    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function (boardId,cards) {
            console.log(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};