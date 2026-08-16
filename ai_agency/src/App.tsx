import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import WorkDetail from "./pages/WorkDetail";
import Works from "./pages/Works";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/consult" element={<Contact />} />
          <Route path="/contact" element={<Navigate to="/consult" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
