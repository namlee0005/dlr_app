import { Platform } from 'react-native';

/**
 *
 * @param {string} tag
 * @param {string} type
 * @param {string} value
 */
export function Logger(tag = 'AD', type, value) {
  // eslint-disable-next-line no-console
  console.log(`[${tag}][${type}]:`, value);
}

export function listItemsGenerator(num) {
  let list = [];
  for (var i = 0; i < num; i++) {
    list = [
      ...list,
      ...[
        'Apple ' + i,
        'Banana ' + i,
        'Orange ' + i,
        'Pineapple ' + i,
        'Pancakes ' + i,
        'ad ' + i,
      ],
    ];
  }

  return list;
}

export const adUnitIDs = {
  image:
    Platform.OS === 'ios'
      ? 'ca-app-pub-1166686303975319/2523575347'
      : 'ca-app-pub-1166686303975319/3748139053',
  video:
    Platform.OS === 'ios'
      ? 'ca-app-pub-1166686303975319/2523575347'
      : 'ca-app-pub-1166686303975319/3748139053',
};

export const Events = {
  onViewableItemsChanged: 'onViewableItemsChanged',
};

export const routes = [
  {
    index: 0,
    type: 'banner',
  },
  {
    index: 1,
    type: 'image',
  },
  {
    index: 2,
    type: 'video',
  },
  {
    index: 3,
    type: 'list',
  },
];
