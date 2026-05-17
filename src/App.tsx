import { Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { HomePage } from '@pages/home';
import { CatalogPage } from '@pages/catalog';
import { ProductPage } from '@pages/product';
import { LoginPage } from '@pages/login';
import { CartPage } from '@pages/cart';
import { FavoritesPage } from '@pages/favorites';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
