import { useEffect, useRef, useState } from 'react';

export default function AdSenseAd({ 
  client = "ca-pub-4946584433561362", 
  slot = "2062230511", 
  format = "auto",
  responsive = true,
  className = "",
  style = {},
  testMode = false
}) {
  const adRef = useRef(null);
  const [adStatus, setAdStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos con intervalos de 100ms

    // Función para cargar el anuncio
    const loadAd = () => {
      if (typeof window !== 'undefined' && adRef.current) {
        try {
          // Verificar si AdSense está disponible
          if (window.adsbygoogle) {
            // Solo intentar cargar si el elemento no tiene ya un anuncio
            if (!adRef.current.hasAttribute('data-ad-status')) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              setAdStatus('loaded');
              setDebugInfo('AdSense push() executed successfully');
              
              // Verificar el estado después de un tiempo
              setTimeout(() => {
                const status = adRef.current?.getAttribute('data-ad-status');
                const height = adRef.current?.style.height;
                setDebugInfo(`Status: ${status}, Height: ${height}`);
              }, 2000);
            } else {
              setAdStatus('already-loaded');
              setDebugInfo('Ad already has data-ad-status attribute');
            }
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(loadAd, 100);
              setDebugInfo(`Waiting for AdSense... attempt ${attempts}/${maxAttempts}`);
            } else {
              setAdStatus('timeout');
              setDebugInfo('AdSense script not available after 5 seconds');
            }
          }
        } catch (error) {
          console.warn('Error loading AdSense ad:', error);
          setAdStatus('error');
          setDebugInfo(`Error: ${error.message}`);
        }
      }
    };

    // Iniciar la carga
    loadAd();
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '100px', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      
      {/* Debug info solo en modo test */}
      {(testMode || process.env.NODE_ENV === 'development') && (
        <div className="mt-2 p-2 bg-gray-100 text-xs text-gray-600 rounded">
          <div><strong>AdSense Debug:</strong></div>
          <div>Status: {adStatus}</div>
          <div>Client: {client}</div>
          <div>Slot: {slot}</div>
          <div>Info: {debugInfo}</div>
        </div>
      )}
    </div>
  );
}
