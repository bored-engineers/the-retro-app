import { Collection, Db } from 'mongodb';
import MongoDB from '../db';

const CARD_COLLECTION_NAME = 'cards';

type CardPayload = {
    cardId: string;
    boardId: string;
    category: string;
    text: string;
    votes: string[];
}

type CardType = CardPayload & {
    createdAt: Date;
    modifiedAt: Date;
}

type CardTypeWithId = CardType & {
    _id: string;
}

export default class Cards {
  private async getCollection (): Promise<Collection> {
    return (await MongoDB() as Db).collection(CARD_COLLECTION_NAME);
  }

  public async createCard (cardPayload: CardPayload): Promise<CardTypeWithId> {
    const createPayload: CardType = {
      ...cardPayload, createdAt: new Date(), modifiedAt: new Date()
    };
    return await (await (await this.getCollection()).insertOne(createPayload)).ops[0];
  }

  public async getCard (cardId: string): Promise<CardTypeWithId> {
    return (await (await this.getCollection()).findOne({ cardId }));
  }

  public async listCards (boardId: string): Promise<CardTypeWithId[]> {
    return (await (await this.getCollection()).find({ boardId })).toArray();
  }
}
