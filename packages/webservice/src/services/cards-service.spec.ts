import CardService from './cards-service';
import Card from '../models/card';
import { v4 as uuid } from 'uuid';

jest.mock('../models/card');
jest.mock('uuid');

describe('Card Service', () => {
  const cardId = 'some card id';
  const sampleCard = {
    boardId: 'some board id',
    text: 'this is the card text',
    category: 'some category',
    votes: [],
    cardId,
    createdAt: Date.now(),
    modifiedAt: Date.now()
  };
  const sampleCardFromMongo = {
    ...sampleCard,
    _id: 'some _id'
  };
  let cardMock;
  let createCardMock;
  let listCardsMock;
  let removeCardMock;
  let updateCardMock;
  let cardService;

  beforeAll(() => {
    createCardMock = jest.fn().mockReturnValue(sampleCardFromMongo);
    listCardsMock = jest.fn().mockReturnValue([sampleCardFromMongo]);
    removeCardMock = jest.fn().mockReturnValue(sampleCardFromMongo);
    updateCardMock = jest.fn();
    cardMock = {
      createCard: createCardMock,
      listCards: listCardsMock,
      removeCard: removeCardMock,
      updateCard: updateCardMock
    };
    (Card as jest.Mock).mockImplementation(() => cardMock);
    cardService = new CardService();
    expect(Card).toHaveBeenCalled();
  });

  beforeEach(() => {
    (uuid as jest.Mock).mockReturnValue(cardId);
    createCardMock.mockReturnValue(sampleCardFromMongo);
    removeCardMock.mockReturnValue(sampleCardFromMongo);
    updateCardMock.mockReturnValue(sampleCardFromMongo);
    listCardsMock.mockReturnValue([sampleCardFromMongo]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should add card', async () => {
    const createPayload = {
      text: 'some text',
      category: 'some category',
      boardId: 'some board id'
    };

    const result = await cardService.addCard(createPayload);

    expect(result).toEqual(sampleCard);
    expect(uuid).toHaveBeenCalled();
    expect(createCardMock).toHaveBeenCalledWith({ ...createPayload, votes: [], cardId });
  });

  it('should remove card', async () => {
    const result = await cardService.deleteCard(cardId);

    expect(result).toEqual(sampleCardFromMongo);
    expect(removeCardMock).toHaveBeenCalledWith(cardId);
  });

  it('should list cards', async () => {
    const boardId = 'some board id';

    const result = await cardService.listCard(boardId);

    expect(result).toEqual([sampleCardFromMongo]);
    expect(listCardsMock).toHaveBeenCalledWith(boardId);
  });

  it('should update cards', async () => {
    const updatePayload = { ...sampleCard, text: 'some new text' };
    updateCardMock.mockReturnValue({ ...sampleCardFromMongo, text: 'some new text' });

    const result = await cardService.updateCard(updatePayload);

    expect(result).toEqual({ ...sampleCard, text: 'some new text' });
    expect(updateCardMock).toHaveBeenCalledWith(updatePayload);
  });

  describe('update vote', () => {
    it('should add vote for user if not already voted', async () => {
      const userId = 'some user id';
      updateCardMock.mockReturnValue({ ...sampleCardFromMongo, votes: [userId] });
      const updatedPayload = { ...sampleCard, votes: [userId] };

      const result = await cardService.updateVote(sampleCard, userId);

      expect(result).toEqual(updatedPayload);
      expect(updateCardMock).toHaveBeenCalledWith(updatedPayload);
    });

    it('should add vote for user if not already voted', async () => {
      const userId = 'some user id';
      updateCardMock.mockReturnValue(sampleCardFromMongo);
      const updatePayload = { ...sampleCard, votes: [userId] };

      const result = await cardService.updateVote(updatePayload, userId);

      expect(result).toEqual(sampleCard);
      expect(updateCardMock).toHaveBeenCalledWith(sampleCard);
    });
  });
});
