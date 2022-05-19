import { Component } from '@angular/core';
import { AdMob, AdMobRewardItem, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdPluginEvents } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    this.initialize();
  }

  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      console.log('Display information before ads load first time');
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['TESTDEVICECODE'],
      initializeForTesting: true
    });

  }
  
  async showBanner() {
    const adId = isPlatform('ios') ? '7296231976' : '7759266400';

    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
      // npa: true
    };

    await AdMob.showBanner(options);

  }
  
  async hideBanner() {
    await AdMob.hideBanner();
    await AdMob.removeBanner();
  }
  
  async showInterstitial() {
    const adId = isPlatform('ios') ? '5387705192' : '5133103067';

    const options: AdOptions = {
      adId,
      isTesting: true
      // npa: true
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }
  
  async showRewardVideo() {
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
        console.log('REWARD: ' + JSON.stringify(reward));
      }
    );

    const adId = isPlatform('ios') ? '7024769233' : '6909219167';

    const options: AdOptions = {
      adId,
      isTesting: true
      // npa: true
      // ssv: {...}
    };

    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }



}
