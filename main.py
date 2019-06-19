from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-board/<int:board_id>")
@json_response
def get_board_by_id(board_id: int):
    return data_handler.get_board_by_id(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    return data_handler.get_statuses()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    return data_handler.get_cards_for_board(board_id)


@app.route("/get-statuses/<int:status_id>")
@json_response
def get_status(status_id: int):
    return data_handler.get_status_by_id(status_id)


@app.route("/get-cards/<int:card_id>")
@json_response
def get_card_by_id(card_id):
    return data_handler.get_card_by_id(card_id)


@app.route("/get-last-card-id")
@json_response
def get_last_card_id():
    return data_handler.get_last_card_id()


@app.route("/write-cards", methods=['POST'])
@json_response
def write_cards_to_file():
    data_handler.write_cards_to_file(request.json['dict_data'])
    return True


@app.route("/write-boards", methods=['POST'])
@json_response
def write_boards_to_file():
    data_handler.write_boards_to_file(request.json['dict_data'])
    return True


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
