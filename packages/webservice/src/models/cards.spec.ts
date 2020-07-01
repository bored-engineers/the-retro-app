import Cards from './cards';
import MongoDB from '../db';

jest.mock('../db');
describe('Cards Model', () => {
  const cards = new Cards();
  let insertOneMock;
  let findOneMock;
  let findMock;
  const sampleDate = new Date(1466424490000);

  const dummyCard = { _id: 'id from mongo', cardId: 'sample-card-id', category: 'went-well', text: 'i liked socket io', boardId: 'dummy-board-id', votes: [], createdAt: sampleDate, modifiedAt: sampleDate };

  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => sampleDate as unknown as string);
    insertOneMock = jest.fn().mockReturnValue({ ops: [dummyCard] });
    findOneMock = jest.fn().mockReturnValue(dummyCard);
    findMock = jest.fn().mockReturnValue({ toArray: () => [dummyCard] });
    (MongoDB as jest.Mock).mockImplementation(() => ({ collection: () => ({ insertOne: insertOneMock, findOne: findOneMock, find: findMock }) }));
  });

  it('should read a card', async () => {
    const cardId = 'dummy-card-id';
    const readResult = await cards.getCard(cardId);
    const expectedResult = { ...dummyCard };

    expect(readResult).toEqual(expectedResult);
    expect(findOneMock).toHaveBeenCalledWith({ cardId });
  });

  it('should create a card', async () => {
    const cardPayload = { cardId: 'dummy-card-id', category: 'went-well', text: 'i liked socket io', boardId: 'dummy-board-id', votes: [] };
    const readResult = await cards.createCard(cardPayload);
    const expectedResult = { ...dummyCard };

    expect(readResult).toEqual(expectedResult);
    expect(insertOneMock).toHaveBeenCalledWith({ ...cardPayload, createdAt: sampleDate, modifiedAt: sampleDate });
  });

  it('should find all cards for a board', async () => {
    const boardId = 'dummy-board-id';
    const listCardsResult = await cards.listCards(boardId);
    const expectedResult = [{ ...dummyCard }];

    expect(listCardsResult).toEqual(expectedResult);
    expect(findMock).toHaveBeenCalledWith({ boardId });
  });
});
