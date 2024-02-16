import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import SubmitStudent from "./pages/SubmitStudent";
import GetStudent from "./pages/GetStudent";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudent from "./pages/DeleteStudent";
import StudentList from "./pages/StudentList"; // StudentList bileşenini import et

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate replace to="/dashboard" />} /> {/* Anasayfadan /dashboard'a yönlendirme */}
              <Route path="/dashboard" element={<SharedLayout/>}>
                  <Route index element={<Home/>}/>
                  <Route path="submit" element={<SubmitStudent/>}/>
                  <Route path="get" element={<GetStudent/>}/>
                  <Route path="update" element={<UpdateStudent/>}/>
                  <Route path="delete" element={<DeleteStudent/>}/>
                  <Route path="list" element={<StudentList/>}/> {/* Öğrenci listeleme için yeni yol */}
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
