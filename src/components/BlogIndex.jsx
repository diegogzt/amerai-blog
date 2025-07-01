import { useState, useEffect } from "react";
import AdSenseAd from "./AdSenseAd.jsx";

export default function BlogIndex({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);
  const [error, setError] = useState(null);
  const [loadedFromAPI, setLoadedFromAPI] = useState(false);

  useEffect(() => {
    // Solo cargar de la API si no tenemos posts iniciales o si queremos actualizar
    if (initialPosts.length === 0 || !loadedFromAPI) {
      const timeoutId = setTimeout(() => {
        if (loading) {
          setError("La carga está tomando más tiempo del esperado. Por favor, recarga la página.");
          setLoading(false);
        }
      }, 10000); // 10 segundos timeout

      loadPosts().finally(() => {
        clearTimeout(timeoutId);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [initialPosts.length, loadedFromAPI]);

  // Hook para activar AdSense cuando los posts se cargan
  useEffect(() => {
    if (posts.length > 0 && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        // Activar anuncios que se hayan añadido dinámicamente
        const ads = document.querySelectorAll('.adsbygoogle:not([data-ad-status])');
        ads.forEach(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (error) {
        console.warn('Error activating AdSense:', error);
      }
    }
  }, [posts]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Crear AbortController para poder cancelar la request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout
      
      const response = await fetch("/api/articles-combined", {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'public, max-age=300'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setLoadedFromAPI(true);
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError("La carga está tomando demasiado tiempo. Por favor, recarga la página.");
      } else {
        setError("Error cargando los artículos. Verifica tu conexión.");
      }
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "noticias-ia": "bg-blue-100 text-blue-800",
      "tutoriales-ia": "bg-green-100 text-green-800",
      "modelos-generativos": "bg-purple-100 text-purple-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando artículos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadPosts}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay artículos disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-white text-lg font-semibold text-center px-4">
                    {post.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category.replace("-", " ").toUpperCase()}
                  </span>
                  <time className="text-gray-500 text-sm">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <a
                  href={
                    post.isStatic ? `/blog/${post.slug}` : `/blog/${post.slug}`
                  }
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Leer más →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* AdSense In-Content */}
        {posts.length > 6 && (
          <div className="my-12">
            <AdSenseAd 
              client="ca-pub-4946584433561362"
              slot="2062230511"
              format="auto"
              className="bg-white rounded-lg shadow-md p-4"
              testMode={true}
            />
          </div>
        )}
      </section>
    </div>
  );
}
