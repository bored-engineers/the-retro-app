import io, { Socket } from 'socket.io';
import { CardService, BoardService } from './services';

const socketServer: io.Server = io();

enum SocketEvent {
  CONNECT = 'connect',
  WELCOME = 'welcome',
  USER_ADDED = 'user-added',
  CREATE_CARD = 'create-card',
  ADD_CARD = 'add-card',
  UPDATE_CARD = 'update-card',
  VOTE_CARD = 'vote-card',
  SUBMIT_SAFETY_SCORE = 'submit-safety-score',
  UPDATE_SAFETY_SCORE = 'update-safety-scores'
}

type QueryType = {
  boardId: string;
  userId: string;
}

type CardPayloadType = {
  text: string;
  category: string;
}

type UpdateCardPayloadType = CardPayloadType & {
  boardId: string;
  votes: string[]
  cardId: string;
  createdAt: Date;
  modifiedAt: Date;
}

socketServer.on(SocketEvent.CONNECT, async function (socket: Socket & { userId: string, boardId: string }) {
  const cardService = new CardService();
  const boardService = new BoardService();
  const { boardId, userId } = socket.handshake.query as QueryType;
  console.log('Connection:', boardId, userId);
  if (Boolean(boardId) && Boolean(userId)) {
    socket.userId = userId;
    socket.boardId = boardId;

    socket.join(boardId);

    socketServer.in(socket.boardId).emit(SocketEvent.USER_ADDED, { userId });

    socket.emit(SocketEvent.WELCOME, { boardId, cards: await cardService.listCard(boardId), safetyScores: await boardService.getSafetyScores(boardId) });

    socket.on(SocketEvent.CREATE_CARD, async (cardPayload: CardPayloadType) => {
      const addedCard = await cardService.addCard({ ...cardPayload, boardId });
      socketServer.in(socket.boardId).emit(SocketEvent.ADD_CARD, addedCard);
    });

    socket.on(SocketEvent.UPDATE_CARD, async (cardPayload: UpdateCardPayloadType) => {
      const updatedCard = await cardService.updateCard({ ...cardPayload, boardId });
      socketServer.in(socket.boardId).emit(SocketEvent.ADD_CARD, updatedCard);
    });

    socket.on(SocketEvent.VOTE_CARD, async (cardPayload: UpdateCardPayloadType) => {
      const updatedCard = await cardService.updateVote(cardPayload, userId);
      socketServer.in(socket.boardId).emit(SocketEvent.ADD_CARD, updatedCard);
    });

    socket.on(SocketEvent.SUBMIT_SAFETY_SCORE, async (newScore: number) => {
      const updatedScores = await boardService.updateSafetyScore(boardId, newScore);
      socketServer.in(socket.boardId).emit(SocketEvent.UPDATE_SAFETY_SCORE, updatedScores);
    });
  }
});

export default socketServer;
