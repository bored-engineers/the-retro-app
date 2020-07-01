import { v4 as uuid } from 'uuid';
import Cards from '../models/cards';

type CardPayloadType = {
  boardId: string;
  text: string;
  category: string;
};

export default class CardsService {
  cardDao: Cards;

  constructor () {
    this.cardDao = new Cards();
  }

  async addCard (cardPayload: CardPayloadType) {
    const cardId = uuid();
    const addCardResult = await this.cardDao.createCard({ ...cardPayload, cardId, votes: [] });
    delete addCardResult._id;
    return addCardResult;
  }

  async listCard (boardId: string) {
    return await this.cardDao.listCards(boardId);
  }
}
