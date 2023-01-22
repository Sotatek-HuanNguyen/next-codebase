import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';

import { useSocket } from '../hooks/useSocket';
import { SocketContextProvider, defaultSocketContextState, socketReducer } from './socketContext';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;

  const socket = useSocket('ws://localhost:1337', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  });

  const [socketState, socketDispatch] = useReducer(socketReducer, defaultSocketContextState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();
    socketDispatch({ type: 'update_socket', payload: socket });
    startListeners();
    sendHandshake();
    // eslint-disable-next-line
  }, []);

  const startListeners = () => {
    /** Messages */
    socket.on('user_connected', (users: string[]) => {
      console.info('User connected message received');
      socketDispatch({ type: 'update_users', payload: users });
    });

    /** Messages */
    socket.on('user_disconnected', (uid: string) => {
      console.info('User disconnected message received');
      socketDispatch({ type: 'remove_user', payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', (attempt) => {
      console.info('Reconnected on attempt: ' + attempt);
      sendHandshake();
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert(
        'We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.'
      );
    });
  };

  const sendHandshake = async () => {
    console.info('Sending handshake to server ...');

    socket.emit('handshake', async (uid: string, users: string[]) => {
      console.info('User handshake callback message received');
      socketDispatch({ type: 'update_users', payload: users });
      socketDispatch({ type: 'update_uid', payload: uid });
    });

    setLoading(false);
  };

  if (loading) return <p>... loading Socket IO ....</p>;

  return (
    <SocketContextProvider value={{ socketState, socketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
