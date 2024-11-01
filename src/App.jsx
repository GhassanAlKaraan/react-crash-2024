import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";

//
import { toast } from "react-toastify";
//

const App = () => {

  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    });
    const data = await res.json();
    console.log('Job Added:', data);
  };

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    const success = res.ok;
    console.log(success ? `Job deleted successfully: ${id}` : `Could not delete job: ${id}`);
    if (!success) { toast.error("Could Not Delete Job. Please try again later."); }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;