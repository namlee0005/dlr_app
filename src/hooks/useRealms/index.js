import { useContext, useCallback } from 'react';
import { StoreContext } from '@src/store';
const useRealms = (schema) => {
  const { state } = useContext(StoreContext);

  const getObject = useCallback(() => {
    if (state?.realm === null || schema === null) {
      return [];
    }
    return state?.realm?.objects(schema).map((i) => i);
  }, [schema, state]);

  return getObject();
};

export default useRealms;
