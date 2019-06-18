import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def get_board_by_id(board_id):
    boards = persistence.get_boards(force=True)
    for board in boards:
        if board.get("id") == str(board_id):
            return board


def get_statuses():
    persistence.clear_cache()
    return persistence.get_statuses(force=True)


def get_status_by_id(status_id):
    persistence.clear_cache()
    statuses = persistence.get_statuses()
    for status in statuses:
        if status["id"] == str(status_id):
            return status.get("title")


def get_card_by_id(card_id):
    persistence.clear_cache()
    cards = persistence.get_cards()
    for card in cards:
        if card.get("id") == int(card_id):
            return card


def get_last_card_id():
    cards = persistence.get_cards()
    max_id = 0
    for card in cards:
        if int(card.get("id")) > int(max_id):
            max_id = int(card.get("id"))
    return max_id+1


def write_cards_to_file(dict_data):
    persistence.write_cards(dict_data=dict_data)
    return
