import Card from './card';
import MongoDB from '../db';

jest.mock('../db');

describe('Cards Model', () => {
  const cards = new Card();
  const sampleDate = new Date(1466424490000);
  const dummyCard = {
    _id: 'id from mongo',
    cardId: 'sample-card-id',
    category: 'went-well',
    text: 'i liked socket io',
    boardId: 'dummy-board-id',
    votes: [],
    createdAt: sampleDate,
    modifiedAt: sampleDate
  };
  let insertOneMock;
  let findOneMock;
  let findMock;
  let findOneAndDeleteMock;
  let dateSpy;
  let findOneAndUpdateMock;

  beforeEach(() => {
    dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => sampleDate as unknown as string);
    insertOneMock = jest.fn().mockResolvedValue({ ops: [dummyCard] });
    findOneMock = jest.fn().mockResolvedValue(dummyCard);
    findMock = jest.fn().mockResolvedValue({ toArray: () => [dummyCard] });
    findOneAndDeleteMock = jest.fn().mockResolvedValue({ value: dummyCard });
    findOneAndUpdateMock = jest.fn();
    (MongoDB as jest.Mock).mockResolvedValue({ collection: jest.fn().mockResolvedValue({ insertOne: insertOneMock, findOne: findOneMock, find: findMock, findOneAndDelete: findOneAndDeleteMock, findOneAndUpdate: findOneAndUpdateMock }) });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should read a card', async () => {
    const cardId = 'dummy-card-id';
    const expectedResult = { ...dummyCard };

    const readResult = await cards.getCard(cardId);

    expect(readResult).toEqual(expectedResult);
    expect(findOneMock).toHaveBeenCalledWith({ cardId });
  });

  it('should create a card', async () => {
    const cardPayload = { cardId: 'dummy-card-id', category: 'went-well', text: 'i liked socket io', boardId: 'dummy-board-id', votes: [] };
    const expectedResult = { ...dummyCard };

    const readResult = await cards.createCard(cardPayload);

    expect(readResult).toEqual(expectedResult);
    expect(dateSpy).toHaveBeenCalledTimes(2);
    expect(insertOneMock).toHaveBeenCalledWith({ ...cardPayload, createdAt: sampleDate, modifiedAt: sampleDate });
  });

  it('should find all cards for a board', async () => {
    const boardId = 'dummy-board-id';
    const expectedResult = [{ ...dummyCard }];

    const listCardsResult = await cards.listCards(boardId);

    expect(listCardsResult).toEqual(expectedResult);
    expect(findMock).toHaveBeenCalledWith({ boardId });
  });

  it('should remove card for a board', async () => {
    const cardId = 'dummy-card-id';

    const removedCard = await cards.removeCard(cardId);

    expect(removedCard).toEqual(dummyCard);
    expect(findOneAndDeleteMock).toHaveBeenCalledWith({ cardId });
  });

  it('should update card', async () => {
    const cardId = 'sample-card-id';
    const boardId = 'dummy-board-id';
    const updateCardPayload = { ...dummyCard, text: 'new text'};
    findOneAndUpdateMock.mockResolvedValue({value: updateCardPayload});

    const updatedCard = await cards.updateCard(updateCardPayload);

    expect(updatedCard).toEqual({...updateCardPayload, modifiedAt: sampleDate});
    expect(dateSpy).toHaveBeenCalled();
    expect(findOneAndUpdateMock).toHaveBeenCalledWith({ cardId, boardId }, { $set: { ...updateCardPayload } }, { returnOriginal: false });
  });
});
