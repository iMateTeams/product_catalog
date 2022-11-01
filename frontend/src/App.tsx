
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
// import { MainNav } from './components/MainNav';
import { Header } from './components/Header/header';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage';
import { Home } from './pages/Home';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';

const App: React.FC = () => {
  return (
    <>
      {/* <MainNav /> */}
      <Header/>
      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={<CatalogPage/>} />
              <Route path=":idPhone" element={<PhoneCardPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<TabletsPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
