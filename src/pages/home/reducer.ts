import { incrementToNearestOdd, randomInteger } from '../../utils';

interface IState {
  count: number;
}

interface IAction {
  type: 'increment' | 'incrementRandom' | 'incrementToNearestOdd' | 'decrement' | 'decrementByUserInput' | 'reset';
  payload?: { newState: number };
}

export const initialState: IState = {
  count: 1,
};
export function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'incrementRandom':
      return { count: state.count + randomInteger(1, 10) };
    case 'incrementToNearestOdd':
      return { count: incrementToNearestOdd(state.count) };
    case 'decrement':
      if (state.count === 1) {
        return { count: state.count };
      }
      return { count: state.count - 1 };
    case 'decrementByUserInput':
      if (state.count === 1) {
        return { count: state.count };
      }
      if (action?.payload?.newState) {
        const decrementResult = state.count - action.payload.newState;
        if (decrementResult < 1) {
          return { count: 1 };
        }

        return { count: decrementResult };
      }
      return { count: state.count };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}
