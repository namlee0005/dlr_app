import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import { MediaView } from './MediaView';
import { adUnitIDs, Events, Logger } from './utils';

const AdView = React.memo(({ index, media, type, loadOnMount = true }) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef();

  const onAdFailedToLoad = (event) => {
    setError(true);
    setLoading(false);
    /**
     * Sometimes when you try to load an Ad, it will keep failing
     * and you will recieve this error: "The ad request was successful,
     * but no ad was returned due to lack of ad inventory."
     *
     * This error is not a bug or issue with our Library.
     * Just remove the app from your phone & clean your build
     * folders by running ./gradlew clean in /android folder
     * and for iOS clean the project in xcode. Hopefully the error will
     * be gone.
     *
     * [iOS] If you get this error: "Cannot find an ad network adapter with
     * the name(s): com.google.DummyAdapter". The ad inventory is empty in your
     * location. Try using a vpn to get ads in a different location.
     *
     * If you have recently created AdMob IDs for your ads, it might take
     * a few days until the ads will start showing.
     */
    Logger('AD', 'FAILED', event.error.message);
  };

  const onAdLoaded = () => {
    Logger('AD', 'LOADED', 'Ad has loaded successfully');
  };

  const onAdClicked = () => {
    Logger('AD', 'CLICK', 'User has clicked the Ad');
  };

  const onAdImpression = () => {
    Logger('AD', 'IMPRESSION', 'Ad impression recorded');
  };

  const onUnifiedNativeAdLoaded = (event) => {
    Logger('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    setLoading(false);
    setLoaded(true);
    setError(false);
    setAspectRatio(event.aspectRatio);
  };

  const onAdLeftApplication = () => {
    Logger('AD', 'LEFT', 'Ad left application');
  };

  const onViewableItemsChanged = useCallback(
    (event) => {
      /**
       * [STEP IV] We check if any AdViews are currently viewable.
       */
      let viewableAds = event.viewableItems.filter(
        (i) => i.key.indexOf('ad') !== -1,
      );

      viewableAds.forEach((adView) => {
        if (adView.index === index && !loaded) {
          /**
           * [STEP V] If the ad is viewable and not loaded
           * already, we will load the ad.
           */
          setLoading(true);
          setLoaded(false);
          setError(false);
          Logger('AD', 'IN VIEW', 'Loading ' + index);
          nativeAdRef.current?.loadAd();
        } else {
          /**
           * We will not reload ads or load
           * ads that are not viewable currently
           * to save bandwidth and requests sent
           * to server.
           */
          if (loaded) {
            Logger('AD', 'IN VIEW', 'Loaded ' + index);
          } else {
            Logger('AD', 'NOT IN VIEW', index);
          }
        }
      });
    },
    [index, loaded],
  );

  useEffect(() => {
    /**
     * for previous steps go to List.js file.
     *
     * [STEP III] We will subscribe to onViewableItemsChanged event in all AdViews in the List.
     */
    if (!loadOnMount) {
      DeviceEventEmitter.addListener(
        Events.onViewableItemsChanged,
        onViewableItemsChanged,
      );
    }

    return () => {
      if (!loadOnMount) {
        DeviceEventEmitter.removeListener(
          Events.onViewableItemsChanged,
          onViewableItemsChanged,
        );
      }
    };
  }, [loadOnMount, loaded, onViewableItemsChanged]);

  useEffect(() => {
    if (loadOnMount) {
      setLoading(true);
      setLoaded(false);
      setError(false);
      nativeAdRef.current?.loadAd();
    }
    return () => {
      setLoaded(false);
    };
  }, [loadOnMount, type]);

  return !error ? (
    <NativeAdView
      ref={nativeAdRef}
      onAdLoaded={onAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
      onAdLeftApplication={onAdLeftApplication}
      onAdClicked={onAdClicked}
      onAdImpression={onAdImpression}
      onUnifiedNativeAdLoaded={onUnifiedNativeAdLoaded}
      style={styles.nativeAdView}
      adUnitID={type === 'image' ? adUnitIDs.image : adUnitIDs.video} // REPLACE WITH NATIVE_AD_VIDEO_ID for video ads.
    >
      <View style={styles.itemContainer}>
        <View style={styles.child(loading, error, loaded)}>
          {loading && <ActivityIndicator size={28} color="#a9a9a9" />}
          {error && <Text style={styles.color}>:-(</Text>}
        </View>

        <View style={styles.child1(loading, error, loaded)}>
          <IconView style={styles.iconView} />
          <View style={styles.viewChild1}>
            <HeadlineView hello="abc" style={styles.headlineView} />
            <TaglineView numberOfLines={2} style={styles.taglineView} />
            <AdvertiserView style={styles.advertiserView} />

            <View style={styles.view1Child1}>
              <StoreView style={styles.storeView} />
              <StarRatingView
                starSize={12}
                fullStarColor="orange"
                emptyStarColor="gray"
                containerStyle={styles.starRatingView}
              />
            </View>
          </View>

          <CallToActionView
            style={styles.callToActionView}
            buttonAndroidStyle={styles.buttonAndroidStyle}
            allCaps
            textStyle={styles.textStyle}
          />
        </View>

        {media ? <MediaView aspectRatio={aspectRatio} /> : null}
      </View>
    </NativeAdView>
  ) : null;
});

const styles = StyleSheet.create({
  nativeAdView: {
    width: '98%',
    alignSelf: 'center',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  child: (loading, error, loaded) => {
    return {
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: !loading && !error && loaded ? 0 : 1,
      zIndex: !loading && !error && loaded ? 0 : 10,
    };
  },
  child1: (loading, error, loaded) => {
    return {
      height: 100,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      opacity: loading || error || !loaded ? 0 : 1,
    };
  },
  iconView: { width: 60, height: 60 },
  headlineView: { fontWeight: 'bold', fontSize: 13 },
  taglineView: { fontSize: 11 },
  advertiserView: { fontSize: 10, color: 'gray' },
  storeView: { fontSize: 12 },
  starRatingView: { width: 65, marginLeft: 10 },
  callToActionView: {
    minHeight: 45,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    maxWidth: 100,
    width: 80,
  },
  buttonAndroidStyle: { backgroundColor: '#00ff00', borderRadius: 5 },
  textStyle: {
    fontSize: 13,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  view2Child1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewChild1: {
    width: '60%',
    maxWidth: '60%',
    paddingHorizontal: 6,
  },
  color: { color: '#a9a9a9' },
});

export default AdView;
