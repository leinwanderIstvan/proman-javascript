// It uses data_handler.js to visualize elements

import { dataHandler } from "./data_handler.js";

export let dom = {
    boardWrapper: '#board-container',
    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
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

    renameBoard: function(board){
        document.getElementById("rename"+board.id).addEventListener("click", function () {
            let newName = prompt("Please enter your new board name", board.title);
        })
    },

    showBoardHeader: function(board){
        const header = document.createElement("div");
        header.classList.add("board-header");
        header.classList.add("open");
        header.setAttribute("id", "board-header" + board.id);
        let title = document.createElement("span");
        title.innerHTML=board.title;
        title.classList.add("board-title");
        header.appendChild(title);
        let button1 = document.createElement("button");
            button1.innerHTML='Add card';
            button1.classList.add("board-add");
            button1.addEventListener("click", function(){
                let newCard = { board_id: board.id,
                                id: 13,
                                order: 2,
                                status_id: "new",
                                title: "this is the newest card"};
                document.getElementById("board-column-content-" + board.id + "-new").appendChild(dom.createCard(newCard));
            });
            header.appendChild(button1);
        let renameButton = document.createElement("button");
        renameButton.id="rename"+board.id;
        renameButton.innerHTML="Rename";
        header.appendChild(renameButton);
        let button2 = document.createElement("button");
            button2.innerHTML='<i class="fas fa-chevron-down"></i>';
            button2.classList.add("board-toggle");
            button2.addEventListener("click", function(){
                if (document.getElementById("board-header" + board.id).classList[1] === "open") {
                    document.getElementById("board-header" + board.id).classList.remove("open");
                    document.getElementById("board-header" + board.id).classList.add("closed");
                    let element = document.getElementById("section" + board.id);
                    element.removeChild(element.lastChild);
                    }
                else {
                    document.getElementById("board-header" + board.id).classList.remove("closed");
                    document.getElementById("board-header" + board.id).classList.add("open");
                    dataHandler.getStatuses((statuses)=>document.getElementById("section" + board.id).appendChild(dom.showBoardBody(statuses, board)));
                }

            });
            header.appendChild(button2);
        return header



    },
    showBoardBody: function(statuses,board){
        if (document.getElementById("board-header" + board.id).classList[1] === "open") {
            let boardBody = document.createElement("div");
            boardBody.classList.add("board-columns");
            boardBody.setAttribute("id", "board-body" + board.id);
            for (let status of statuses) {
                let boardColumn = document.createElement("div");
                boardColumn.classList.add("board-column");
                let boardColumnTitle = document.createElement("div");
                boardColumnTitle.classList.add("board-column-title");
                boardColumnTitle.innerHTML = status.title;
                boardColumn.appendChild(boardColumnTitle);
                dataHandler.getCardsByBoardId(board.id, (cards) => boardColumn.appendChild(dom.selectCards(status, cards)));
                //boardColumnContent.appendChild(dom.createCard());
                boardBody.appendChild(boardColumn);
            }
            return boardBody;
        }
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
            section.id = "section" + board.id;
            section.appendChild(dom.showBoardHeader(board));
            dataHandler.getStatuses((statuses)=>section.appendChild(dom.showBoardBody(statuses, board)));

            document.getElementById("board-container").appendChild(section)
            dom.renameBoard(board);
        }

    },
    createCard: function (card){
        let elementCard = document.createElement("div");
        elementCard.classList.add("card");
        elementCard.id = "card" + card.id;
        let cardRemove = document.createElement("div")
        cardRemove.classList.add("card-remove");
        cardRemove.innerHTML='<i class="fas fa-trash-alt"></i>';
        cardRemove.addEventListener("click", function () {
            document.getElementById("card"+card.id).remove();
        });
        elementCard.appendChild(cardRemove);
        let cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML=card.title;
        elementCard.appendChild(cardTitle);
        return elementCard;
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function (boardId,cards) {
            dom.showCards(cards,boardId);
        })
    },
    showCards: function (cards) {

        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features


    selectCards: function (status,cards) {
        let boardColumnContent = document.createElement("div");
        boardColumnContent.classList.add("board-column-content");
        boardColumnContent.id = "board-column-content-"+ cards[0].board_id +"-" + status.title;
        for ( let card of cards) {
            if (card.status_id === status.title){
                boardColumnContent.appendChild(dom.createCard(card));
            }
        }
    return boardColumnContent
    }

};

