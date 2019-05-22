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
        const header = document.createElement("div");
        header.classList.add("board-header");
        let title = document.createElement("span");
        title.innerHTML=board.title;
        title.classList.add("board-title");
        header.appendChild(title);
        let button1 = document.createElement("button");
            button1.innerHTML='Add card';
            button1.classList.add("board-add");
            header.appendChild(button1);
        let button2 = document.createElement("button");
            button2.innerHTML='V';
            button2.classList.add("board-toggle");
            header.appendChild(button2);
        return header


    },
    showBoardBody: function(statuses){
        const boardBody =`
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
        `;
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
            dom.getStatuses();
            dom.loadCards(1);
            dom.loadCards(2);
        });
    },
    clearBoards: function (){
        document.querySelector(this.boardWrapper).innerHTML = " ";
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for(let board of boards) {
            let section = document.createElement("section");
            section.classList.add("board");
            section.appendChild(dom.showBoardHeader(board));
            document.getElementById("board-container").appendChild(section)
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

    getStatuses: function () {
        dataHandler.getStatuses(function (statuses) {
            console.log(statuses)
        })

    }

};

