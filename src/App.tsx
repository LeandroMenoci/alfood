import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Adminstracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Adminstracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Adminstracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Adminstracao/Restaurante/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Adminstracao/Restaurante/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>

    </Routes>
  );
}

export default App;
