import React,{ useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ClientPage from './pages/ClientPage/ClientPage'
import Contractor from './pages/Contractor/Contractor'
import Worker from './pages/Worker/Worker'
import AddContract from './pages/ClientPage/ClientContractCreate'
import withSidebar from './components/withSidebar/withSidebar';
import AcceptedContracts from './pages/ClientPage/AcceptedContracts'
import MyContracts from './pages/Contractor/MyContracts'
import AppliedWorks from './pages/Worker/AppliedWorks'

const ClientWithSidebar = withSidebar(ClientPage, 'client');
const WorkerWithSidebar = withSidebar(Worker, 'worker');
const AddContractWithSidebar = withSidebar(AddContract, 'client');
const AcceptedContractsWithSidebar = withSidebar(AcceptedContracts, 'client');
const ContractorWithSidebar = withSidebar(Contractor, 'contractor');
const MyContractsWithSidebar = withSidebar(MyContracts, 'contractor');


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <> 
      {showLogin?<LoginPopup setShowLogin ={setShowLogin} />:<></>} 
        <div className="app-container">
          <Navbar  setShowLogin ={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addContract/:id' element={<AddContractWithSidebar />} />
            <Route path='/client/:id' element={<ClientWithSidebar />} />
            <Route path='/ongoingContracts/:id' element={<AcceptedContractsWithSidebar />} />
            <Route path='/contractor/:id' element={<ContractorWithSidebar />} />
            <Route path='/worker/:id' element={<Worker />} />
            <Route path='/applied-works/:id' element={<AppliedWorks />} />
            <Route path='/contractor/:id/my-contracts' element={<MyContractsWithSidebar />} />
          </Routes>
        </div>
      <Footer/>
    </>
  );
};

export default App
