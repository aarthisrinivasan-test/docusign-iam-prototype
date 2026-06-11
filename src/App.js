import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TemplatesPage from "./pages/TemplatesPage";
import TemplateDetailPage from "./pages/TemplateDetailPage";
import WorkflowBuilderPage from "./pages/WorkflowBuilderPage";
import WorkspacePage from "./pages/WorkspacePage";
import AgreementsPage from "./pages/AgreementsPage";
import WorkspaceCollaborationPage from "./pages/WorkspaceCollaborationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="templates/:id" element={<TemplateDetailPage />} />
          <Route path="workflow-builder" element={<WorkflowBuilderPage />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="workspace/collaboration" element={<WorkspaceCollaborationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}