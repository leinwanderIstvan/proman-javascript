// It uses data_handler.js to visualize elements

import {dataHandler} from "./data_handler.js";

const STATUSES = {
    "new": 0,
    "in progress": 1,
    "testing": 2,
    "done": 3,
};

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

    renameBoard: function (board) {
        document.getElementById("rename" + board.id).addEventListener("click", function () {
            let newName = prompt("Please enter your new board name", document.getElementById("title" + board.id).innerHTML);
            document.getElementById("title" + board.id).innerHTML = newName;
            dataHandler.save_boards()
        })
    },

    createBoardToggleButton: function (board) {
        let button = document.createElement("button");
        button.innerHTML = '<i class="fas fa-chevron-down"></i>';
        button.classList.add("board-toggle");
        button.addEventListener("click", function () {
            const headerClassList = document.getElementById("board-header" + board.id).classList;

            if (headerClassList.contains("open")) {
                headerClassList.remove("open");
                headerClassList.add("closed");
                let element = document.getElementById("board-body" + board.id);
                element.style.display = "none";
            } else {
                headerClassList.remove("closed");
                headerClassList.add("open");
                let element = document.getElementById("board-body" + board.id);
                element.removeAttribute("style");
            }

        });
        return button;
    },

    showBoardHeader: function (board) {
        const header = document.createElement("div");
        header.classList.add("board-header");
        header.classList.add("open");
        header.setAttribute("id", "board-header" + board.id);
        let title = document.createElement("span");
        title.innerHTML = board.title;
        title.classList.add("board-title");
        title.id = "title" + board.id;
        header.appendChild(title);
        let button1 = document.createElement("button");
        button1.innerHTML = 'Add card';
        button1.classList.add("board-add");
        dataHandler.getLastCardId(function (max_id) {
        });
        button1.addEventListener("click", () => {
            dataHandler.getLastCardId(function (max_id) {
                let newCardName = prompt("Please enter your new card name", "");
                let newCard = {
                    board_id: board.id,
                    id: max_id,
                    order: 2,
                    status_id: "new",
                    title: newCardName
                };
                document.getElementById("board-column-content-" + board.id + "-new").appendChild(dom.createCard(newCard));
                dataHandler.save_cards();
            });
        });
        header.appendChild(button1);
        let renameButton = document.createElement("button");
        renameButton.id = "rename" + board.id;
        renameButton.innerHTML = "Rename";
        header.appendChild(renameButton);
        const deleteBoardButton = document.createElement("button");
        deleteBoardButton.id = "delete-"+ board.id;
        deleteBoardButton.innerHTML = "Delete board";
        deleteBoardButton.addEventListener("click", function () {
           document.getElementById("section" + board.id).remove();
           dataHandler.save_boards()
        });
        header.appendChild(deleteBoardButton);
        header.appendChild(dom.createBoardToggleButton(board));
        return header


    },
    showBoardBody: function (statuses, board) {
        if (document.getElementById("board-header" + board.id).classList[1] !== "open") {
            return;
        }
        let boardBody = document.createElement("div");
        boardBody.classList.add("board-columns");
        boardBody.setAttribute("id", "board-body" + board.id);
        for (let status of statuses) {
            let boardColumn = document.createElement("div");
            boardColumn.classList.add("board-column");
            boardColumn.setAttribute("id", "board-column-" + status.id);
            let boardColumnTitle = document.createElement("div");
            boardColumnTitle.classList.add("board-column-title");
            boardColumnTitle.innerHTML = status.title;
            boardColumn.appendChild(boardColumnTitle);
            let boardColumnContent = document.createElement(boardColumn.appendChild("div"));
            boardColumnContent.classList.add("board-column-content");
            boardColumnContent.id = "board-column-content-" + board.id + "-" + status.title;
            boardColumn.appendChild(boardColumnContent);
            dataHandler.getCardsByBoardId(board.id, (cards) => dom.selectCards(status, cards));
            //boardColumnContent.appendChild(dom.createCard());
            boardBody.appendChild(boardColumn);
        }
        dataHandler.getBoards((boards) => dom.dragAndDrop(boards));
        return boardBody;

    },


    loadBoard: function (board_id) {
        dataHandler.getBoard(board_id, function (board_id, board) {
            console.log(board_id, board)
        });
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.clearBoards();
            dom.showBoards(boards);
        });
    },
    clearBoards: function () {
        document.querySelector(this.boardWrapper).innerHTML = " ";
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (let board of boards) {
            let section = document.createElement("section");
            section.classList.add("board");
            section.id = "section" + board.id;
            section.appendChild(dom.showBoardHeader(board));
            dataHandler.getStatuses((statuses) => section.appendChild(dom.showBoardBody(statuses, board)));

            document.getElementById("board-container").appendChild(section);
            dom.renameBoard(board);
            document.getElementById("board-container").appendChild(section);
        }

    },
    createCard: function (card) {
        let elementCard = document.createElement("div");
        elementCard.classList.add("card");
        elementCard.id = "card" + card.id;
        let cardRemove = document.createElement("div");
        cardRemove.classList.add("card-remove");
        cardRemove.innerHTML = '<i class="fas fa-trash-alt"></i>';
        cardRemove.addEventListener("click", function () {
            this.parentElement.remove();
            dataHandler.save_cards();
        });
        elementCard.appendChild(cardRemove);
        let cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = card.title;
        elementCard.appendChild(cardTitle);
        return elementCard;
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (boardId, cards) {
            dom.showCards(cards, boardId);
        })
    },
    showCards: function (cards) {

        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features


    selectCards: function (status, cards) {
/*        let boardColumnContent = document.createElement("div");
        boardColumnContent.classList.add("board-column-content");
        boardColumnContent.id = "board-column-content-" + cards[0].board_id + "-" + status.title;*/
        //dataHandler.getBoards((boards) => dom.dragAndDrop(boards));
        cards.sort(function (a, b) {
            return a.order - b.order
        });
        for (let card of cards) {
            if (card.status_id === status.title) {
                document.getElementById("board-column-content-" + cards[0].board_id + "-" + status.title).appendChild(dom.createCard(card));
            }
        }

        //return boardColumnContent
    },

    dragAndDrop: function (boards) {
        for (let board of boards) {
            dragula([document.getElementById("board-column-content-" + board.id + "-new"),
                document.getElementById("board-column-content-" + board.id + "-in progress"),
                document.getElementById("board-column-content-" + board.id + "-testing"),
                document.getElementById("board-column-content-" + board.id + "-done")])
                .on('drop', function () {
                    dataHandler.save_cards(function () {
                    })
                });
        }

    },


    getCardDataFromHtml: function () {
        let cards = document.querySelectorAll(".card-title");
        let cardsData = [];
        let counter = 0;
        let order = 0;
        for (let i = 0; i < cards.length; i++) {
            const column = cards[i].closest('.board-column-content');
            if (column != null) {
                const cardStatus = column.getAttribute("id").split("-")[4];
                const status = STATUSES[cardStatus];

                if (cards[i].closest('.board-column-content').childElementCount > counter + 1) {
                    order = counter;
                    counter += 1;
                } else {
                    order = counter;
                    counter = 0;
                }

                let cardData = {
                    id: cards[i].parentElement.getAttribute("id").substring(4),
                    board_id: column.getAttribute("id").split("-")[3],
                    title: cards[i].innerHTML,
                    status_id: status.toString(),
                    order: order
                };
                cardsData.push(cardData);
            }
        }
        return cardsData;
    },

    getBoardDataFromHtml: function () {
        let boardsData = [];
        let boards = document.querySelectorAll(".board");
        for (let i =0; i < boards.length; i++){
            let id = boards[i].getAttribute("id").substring(7)
            let boardData = {
                id: id,
                title: document.getElementById("title" + id).innerHTML
            };
            boardsData.push(boardData);
        }
        return boardsData
    }

};

