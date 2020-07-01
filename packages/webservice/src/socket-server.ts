import io, { Socket } from 'socket.io';
import { CardService } from './services';

const socketServer: io.Server = io();

enum SocketEvent {
    CONNECT = 'connect', WELCOME = 'welcome', USER_ADDED = 'user-added', CREATE_CARD = 'create-card', ADD_CARD = 'add-card'
}

type QueryType = {
    boardId: string;
    userId: string;
}

type CardPayloadType = {
    text: string;
    category: string;
}

socketServer.on(SocketEvent.CONNECT, async function (socket: Socket & { userId: string, boardId: string }) {
  const cardService = new CardService();
  const { boardId, userId } = socket.handshake.query as QueryType;
  if (Boolean(boardId) && Boolean(userId)) {
    socket.userId = userId;
    socket.boardId = boardId;

    socket.join(boardId);

    socketServer.in(socket.boardId).emit(SocketEvent.USER_ADDED, { userId });

    socket.emit(SocketEvent.WELCOME, { status: 'success', boardId, cards: await cardService.listCard(boardId) });

    socket.on(SocketEvent.CREATE_CARD, async (cardPayload: CardPayloadType) => {
      const addedCard = await cardService.addCard({ ...cardPayload, boardId });
      socketServer.in(socket.boardId).emit(SocketEvent.ADD_CARD, addedCard);
    });
  }
});

export default socketServer;
