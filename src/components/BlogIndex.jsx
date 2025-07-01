import { useState, useEffect } from "react";

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      // Usar la nueva API que combina artículos estáticos y dinámicos
      const response = await fetch("/api/articles-combined");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setError("Error cargando los artículos");
      }
    } catch (err) {
      setError("Error de conexión");
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Blog de IA
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Descubre las últimas tendencias, tutoriales y análisis del mundo de
            la Inteligencia Artificial
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-green-600/20 text-green-300 px-4 py-2 rounded-full">
              Noticias actualizadas
            </span>
            <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full">
              Tutoriales prácticos
            </span>
            <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full">
              Análisis profundos
            </span>
          </div>
        </div>
      </section>

      {/* AdSense Banner */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <ins
            className="adsbygoogle block"
            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
            data-ad-slot="YOUR_AD_SLOT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>

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
                  href={post.isStatic ? `/blog/${post.slug}` : `/blog/${post.slug}`}
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
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <ins
                className="adsbygoogle block"
                data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="rectangle"
              />
            </div>
          </div>
        )}
      </section>

      {/* AdSense Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <ins
            className="adsbygoogle block"
            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
            data-ad-slot="YOUR_AD_SLOT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
