import { useRef, useReducer, useCallback } from 'react';

const defaultInitialState = { status: 'idle', data: null, error: null };

const ACTION = {
  FETCH: 'data:fetch',
  SUCCESS: 'data:success',
  ERROR: 'data:error',
  RESET: 'data:reset',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.FETCH:
      return { ...state, status: 'pending' };
    case ACTION.SUCCESS:
      return { ...state, status: 'resolved', data: action.payload };
    case ACTION.ERROR:
      return { ...state, status: 'rejected', error: action.payload };
    case ACTION.RESET:
      return { ...defaultInitialState, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(initialState) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, dispatch] = useReducer(
    reducer,
    initialStateRef.current,
  );

  const setData = useCallback(
    (data) => dispatch({ type: ACTION.SUCCESS, payload: data }),
    [],
  );
  const setError = useCallback(
    (error) => dispatch({ type: ACTION.ERROR, payload: error }),
    [],
  );
  const reset = useCallback(
    () => dispatch({ type: ACTION.RESET, payload: initialStateRef.current }),
    [],
  );

  const run = useCallback(
    async (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }
      dispatch({ type: ACTION.FETCH });

      try {
        const data = await promise;
        setData(data);

        return data;
      } catch (error) {
        setError(error);
      }
    },
    [setData, setError],
  );

  return {
    // convenience keys
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
