import React from 'react';
import { appActions, selectCount } from '~/stores/app/app.slice';
import { useAppDispatch, useAppSelector } from '~/stores/hooks';

import styles from './styles.module.scss';

const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const handleIncrement = () => dispatch(appActions.increment(2));

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value">
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value">
          +
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.asyncButton} onClick={handleIncrement}>
          Add Async Saga
        </button>
      </div>
    </div>
  );
};

export default Counter;
