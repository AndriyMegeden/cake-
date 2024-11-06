import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.cakes',
  appName: 'Yummy',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    InAppPurchase2: {
      BILLING_KEY: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo+gvHavrmusxtAIZYGbFe9u5ZJi5yxr40xwv+Euos9cpmLTTBxKe4AGnWZjI8iZm8u061ne646VDF+Jor+wnArCbtf+Dn0sBPpMIz3LGtH0IzaReKCBWwhm8DJVChfFVoA5LmenJIeudlC643PZM3BHJ/sHVt5uivlpomMUz7fTDPeZC0WSmnNrcNZXd4LvrlhSpk9AGGUgBC43aVxhkqx7mLER4PwqWpDPNXbOpoKjXJ7MIlKV1rdrWlpxxBg5F0s0usHatjycDx1We+5m9QZkvELI9x30eIR7BuzfhUGZpRh3d+ndhZRNU6k+RJ9qj+vRZdFDpIL4RsaERAckX0wIDAQAB"
    }
  }
};

export default config;
