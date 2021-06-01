import { useRef, useCallback } from 'react';
import { useRequest } from '@umijs/hooks';
import { v4 as uuid } from 'uuid';

const useFlatList = (service, options) => {
  const request = useRequest(service, {
    loadMore: true,
    debounceInterval: 250,
    isNoMore: (e) => {
      return e?.list?.length >= e?.total;
    },
    ...options,
  });

  const onEndReachedCalledDuringMomentum = useRef(false);

  const onMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false;
  }, []);

  const onEndReached = useCallback(() => {
    if (!onEndReachedCalledDuringMomentum.current) {
      request?.loadMore();
      onEndReachedCalledDuringMomentum.current = true;
    }
  }, [request]);

  const keyExtractor = useCallback(() => uuid(), []);

  const flatListProps = {
    onMomentumScrollBegin,
    keyExtractor,
    onEndReached,
    refreshing: request?.loading,
    onRefresh: request?.refresh,
    data: request?.data?.list,
    onEndReachedThreshold: 0.5,
  };

  return { ...request, flatListProps };
};

export default useFlatList;
