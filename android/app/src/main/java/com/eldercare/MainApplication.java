package com.eldercare;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.imagepicker.ImagePickerPackage;

// import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

//recently add
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.storage.RNFirebaseStoragePackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new ImagePickerPackage(),
            // new ImagePickerPackage(),
            // new ReactNativePushNotificationPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new SvgPackage(),
            new ReanimatedPackage(),
            new AsyncStoragePackage(),
            // new ReactNativePushNotificationPackage(),
            // new ImagePickerPackage(),
            new RNFirebasePackage(),
            //recently add
            new RNFirebaseDatabasePackage(),
            new RNFirebaseMessagingPackage(),
            // new RNFirebaseStoragePackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
