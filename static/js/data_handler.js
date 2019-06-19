// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
import {dom} from "./dom.js";

export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json()) // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(json_response => callback(json_response));
        // it is not called from outside
        // sends the data to the API, and calls callback function
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        let url = "/get-board/" + boardId;
        this._api_get(url, (response) => {
            this._data = response;
            callback(boardId, response);
        });
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        this._api_get('/get-statuses', (response)=>{
            this._data = response;
            callback(response);
        });
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        let url = "/get-statuses/" + statusId;
        this._api_get(url, (response)=>{
            this._data = response;
            callback(statusId, response);
        });
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let url = "/get-cards/" + boardId;
        this._api_get(url, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getLastCardId: function (callback) {
        let url = "/get-last-card-id";
        this._api_get(url, (response) => {
            this._data = response;
            callback(response);
        });
    },

    getLastBoardId: function (callback) {
        let url = "get-last-board-id";
        this._api_get(url, (response) => {
            this._data = response;
            callback(response);
        });
    },


    getCard: function (cardId, callback) {
        let url = "/get-cards/" + cardId;
        this._api_get(url, (response)=>{dict_data
            this._data = response;
            callback(cardId, response);
        })
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },

    save_cards: function (callback) {
        let data = {dict_data: dom.getCardDataFromHtml()};
        dataHandler._api_post('/write-cards', data, callback);
    },

    save_boards: function (callback) {
        let data = {dict_data: dom.getBoardDataFromHtml()};
        dataHandler._api_post('/write-boards', data, callback);
    }
    // here comes more features
};
