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
    showBoardBody: function(){
        let statuses = ["New","In progress","Testing","Done"];
        let boardBody = document.createElement("div");
        boardBody.classList.add("board-columns");
        for (let status of statuses){
            let boardColumn = document.createElement("div");
            boardColumn.classList.add("board-column");
            let boardColumnTitle = document.createElement("div");
            boardColumnTitle.classList.add("board-column-title");
            boardColumnTitle.innerHTML = status;
            boardColumn.appendChild(boardColumnTitle);
            let boardColumnContent = document.createElement("div");
            boardColumnContent.classList.add("board-column-content");
            boardColumn.appendChild(boardColumnContent);
            boardBody.appendChild(boardColumn);
        }
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
            console.log("test", dom.getStatuses());
            dom.getStatus("1");
            dom.getStatus("0");
            dom.loadCards("1");
            dom.getCardsByBoardId("1");
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
            section.appendChild(dom.showBoardBody());
            document.getElementById("board-container").appendChild(section)
        }

    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function (boardId,cards) {
            console.log(cards);
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features

    getStatuses: function () {
        dataHandler.getStatuses(function (statuses,status) {
            console.log(statuses);
            console.log(status);
            dom.showBoardBody(statuses);
        });


    },

    getStatus: function (status_id) {
        dataHandler.getStatus(status_id, function (status_id,status) {
            console.log(status);
        })
    },

    getCardsByBoardId: function (boardId) {
        dataHandler.getCardsByBoardId(boardId, function (boardId,cards) {
            console.log(cards)
        })

    }

};

