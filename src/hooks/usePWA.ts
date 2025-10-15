import { useState, useEffect } from 'react';

export interface PWAInfo {
  isInstalled: boolean;
  canInstall: boolean;
  updateAvailable: boolean;
  showUpdatePrompt: boolean;
  isOffline: boolean;
}

export const usePWA = () => {
  const [pwaInfo, setPwaInfo] = useState<PWAInfo>({
    isInstalled: false,
    canInstall: false,
    updateAvailable: false,
    showUpdatePrompt: false,
    isOffline: !navigator.onLine,
  });

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      const isInstalled = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true;
      
      setPwaInfo(prev => ({ ...prev, isInstalled }));
    };

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaInfo(prev => ({ ...prev, canInstall: true }));
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setPwaInfo(prev => ({ 
        ...prev, 
        isInstalled: true, 
        canInstall: false 
      }));
    };

    // Listen for online/offline status
    const handleOnline = () => {
      setPwaInfo(prev => ({ ...prev, isOffline: false }));
    };

    const handleOffline = () => {
      setPwaInfo(prev => ({ ...prev, isOffline: true }));
    };

    // Listen for service worker updates
    const handleSWUpdate = () => {
      setPwaInfo(prev => ({ 
        ...prev, 
        updateAvailable: true, 
        showUpdatePrompt: true 
      }));
    };

    checkInstalled();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Listen for service worker message
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
          handleSWUpdate();
        }
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dismissUpdatePrompt = () => {
    setPwaInfo(prev => ({ ...prev, showUpdatePrompt: false }));
  };

  return {
    ...pwaInfo,
    dismissUpdatePrompt,
  };
};