import { Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { HomePage } from '@pages/home';
import { CatalogPage } from '@pages/catalog';
import { ProductPage } from '@pages/product';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
