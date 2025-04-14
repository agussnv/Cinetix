import { io } from 'socket.io-client';

const socket = io('http://cinetixback.daw.inspedralbes.cat:29001');

export default socket;