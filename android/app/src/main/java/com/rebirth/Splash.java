package com.rebirth;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;

import android.os.Handler;
import android.view.WindowManager;
import org.devio.rn.splashscreen.SplashScreen;

public class Splash extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
     

         Intent i = new Intent(Splash.this, MainActivity.class);
                 startActivity(i);

                 // close this activity
                 finish();
  
    }
}
