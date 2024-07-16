import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import Test from "./pages/Test";
import UpdateUser from "./pages/UpdateUser";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Snack from "./components/Snack";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRotes } from "./utils/ProtectedRotes";
import { AdminRoutes } from "./utils/AdminRoutes";
import { NoAccess } from "./pages/NoAccess";
import SignUP from "./pages/CreateUser";


export default function App(){

  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element = {<LandingPage />} />
        <Route path="/NoAccess" element = {<NoAccess />} />
        <Route element={<ProtectedRotes />}>
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Test" element={<Test />} />
          <Route path='/Welcome/UpdateUser' element = {<UpdateUser />}/>
          <Route element = {<AdminRoutes />} >
          <Route path='/Welcome/CreateUser' element = {<SignUP messageText="creating user" RoleName="admin" title="Create User" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    <Snack />
    </>
  )
}
