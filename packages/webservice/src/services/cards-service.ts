import { v4 as uuid } from 'uuid';
import Card from '../models/card';

type CardPayloadType = {
  boardId: string;
  text: string;
  category: string;
};

type UpdateCardPayloadType = CardPayloadType & {
  _id?: string;
  votes: string[];
  cardId: string;
  createdAt: Date;
  modifiedAt: Date;
}

export default class CardsService {
  card: Card;

  constructor() {
    this.card = new Card();
  }

  async addCard(cardPayload: CardPayloadType) {
    const cardId = uuid();
    const addCardResult = await this.card.createCard({ ...cardPayload, cardId, votes: [] });
    delete addCardResult._id;
    return addCardResult;
  }

  async listCard(boardId: string) {
    return this.card.listCards(boardId);
  }

  async deleteCard(cardId: string) {
    return this.card.removeCard(cardId);
  }

  async updateCard(cardPayload: UpdateCardPayloadType) {
    if (cardPayload._id) delete cardPayload._id;
    const updateCardResult = await this.card.updateCard({ ...cardPayload });
    delete updateCardResult._id;
    return updateCardResult;
  }

  async updateVote(cardPayload: UpdateCardPayloadType, userId: string) {
    if (cardPayload._id) delete cardPayload._id;
    const updateCardResult = await this.card.updateCard({...cardPayload, votes: this.addOrRemoveVote(cardPayload.votes, userId)});
    delete updateCardResult._id;
    return updateCardResult;
  }

  private addOrRemoveVote(votes: string[], userId: string) {
    const votesSet = new Set(votes);
    if (votesSet.has(userId)) {
      votesSet.delete(userId);
    }
    else {
      votesSet.add(userId);
    }
    return Array.from(votesSet);
  }
}
