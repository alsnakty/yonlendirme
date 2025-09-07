// Cihaz algılama ve otomatik yönlendirme scripti
(function() {
    'use strict';
    
    // User Agent analiz fonksiyonu
    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        // iOS algılama
        if (/iphone|ipod/.test(userAgent) ||
            (/ipad/.test(userAgent)) ||
            (platform.includes('mac') && 'ontouchend' in document)) {
            return {
                type: 'ios',
                name: 'iOS Cihaz',
                icon: 'fab fa-apple',
                color: 'info',
                url: 'ios-sayfasi.html' // DÜZENLENDİ
            };
        }

        // Android algılama
        if (/android/.test(userAgent)) {
            return {
                type: 'android',
                name: 'Android Cihaz',
                icon: 'fab fa-android',
                color: 'success',
                url: 'android-sayfasi.html' // DÜZENLENDİ
            };
        }

        // Diğer cihazlar
        return {
            type: 'other',
            name: 'Diğer Cihaz',
            icon: 'fas fa-desktop',
            color: 'secondary',
            url: 'diger-cihazlar.html' // DÜZENLENDİ
        };
    }
    
    // Progress bar animasyonu
    function animateProgressBar(callback) {
        const progressBar = document.getElementById('redirect-progress');
        if (!progressBar) return;
        
        let width = 0;
        const interval = setInterval(() => {
            width += 33.33;
            progressBar.style.width = width + '%';
            
            if (width >= 100) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 1000);
    }
    
    // Ana algılama ve yönlendirme fonksiyonu
    function performDetection() {
        const loadingElement = document.getElementById('loading');
        const deviceInfoElement = document.getElementById('device-info');
        const deviceTypeElement = document.getElementById('device-type');
        
        if (!loadingElement || !deviceInfoElement || !deviceTypeElement) {
            console.warn('Gerekli DOM elementleri bulunamadı');
            return;
        }
        
        setTimeout(() => {
            const device = detectDevice();
            
            // Cihaz bilgisini göster
            deviceTypeElement.innerHTML = `
                <i class="${device.icon} text-${device.color}"></i>
                ${device.name}
            `;
            
            // Loading'i gizle, device info'yu göster
            loadingElement.classList.add('d-none');
            deviceInfoElement.classList.remove('d-none');
            
            // Progress bar animasyonu ve yönlendirme
            animateProgressBar(() => {
                window.location.href = device.url;
            });
            
            // Konsola bilgi yaz
            console.log('Algılanan cihaz:', device);
            console.log('User Agent:', navigator.userAgent);
            console.log('Platform:', navigator.platform);
            
        }, 1500); // 1.5 saniye bekleme süresi
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', performDetection);
    } else {
        performDetection();
    }
    
    // Hata yakalama
    window.addEventListener('error', function(e) {
        console.error('Cihaz algılama hatası:', e.error);
        // Hata durumunda diğer cihazlar sayfasına yönlendir
        setTimeout(() => {
            window.location.href = '/diger';
        }, 3000);
    });
    
})();

// Ek yardımcı fonksiyonlar
window.DeviceDetection = {
    // Manuel cihaz algılama
    getDeviceInfo: function() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            screenWidth: screen.width,
            screenHeight: screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            isMobile: /Mobi|Android/i.test(navigator.userAgent),
            isTablet: /Tablet|iPad/i.test(navigator.userAgent),
            isDesktop: !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent),
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
        };
    },
    
    // Cihaz türü kontrolü
    isIOS: function() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },
    
    isAndroid: function() {
        return /Android/.test(navigator.userAgent);
    },
    
    isMobile: function() {
        return /Mobi|Android/i.test(navigator.userAgent);
    },
    
    // Tarayıcı algılama
    getBrowser: function() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        if (userAgent.includes('Edg')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        return 'Bilinmeyen';
    },
    
    // Cihaz türüne göre yönlendirme
    redirectByDevice: function(deviceType) {
        if (deviceType === 'Android') {
            window.location.href = 'android-sayfasi.html';
        } else if (deviceType === 'iOS') {
            window.location.href = 'ios-sayfasi.html';
        } else {
            window.location.href = 'diger-cihazlar.html';
        }
    }
};
