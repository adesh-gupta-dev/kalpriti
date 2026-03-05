import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { addMessage, getConversations } from "../../api/conversationApi";
import {
  editProject,
  getProjectById,
  updateProjectVisibility,
} from "../../api/projectApi";
import {
  deleteVersion,
  getVersions,
  restoreVersion,
  saveVersion,
} from "../../api/versionApi";
import { AppSpinner } from "../../components/common/AppSpinner";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { ErrorState } from "../../components/common/ErrorState";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useRequireVerified } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useDebounce } from "../../hooks/useDebounce";
import { ChatWindow } from "../../features/chat/components/ChatWindow";
import { ProjectMetadataCard } from "../../features/projects/components/ProjectMetadataCard";
import { ProjectTopBar } from "../../features/projects/components/ProjectTopBar";
import { RestoreVersionDialog } from "../../features/versions/components/RestoreVersionDialog";
import { SaveVersionModal } from "../../features/versions/components/SaveVersionModal";
import { VersionDrawer } from "../../features/versions/components/VersionDrawer";
import { buildPreviewDocument } from "../../utils/preview";

const VersionCompareModal = lazy(() =>
  import("../../features/diff/components/VersionCompareModal").then(
    (module) => ({
      default: module.VersionCompareModal,
    }),
  ),
);
const EditorLayout = lazy(() =>
  import("../../features/editor/components/EditorLayout").then((module) => ({
    default: module.EditorLayout,
  })),
);

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { assertVerified } = useRequireVerified();

  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [versions, setVersions] = useState([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [saveVersionOpen, setSaveVersionOpen] = useState(false);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [saveVersionLoading, setSaveVersionLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState(null);
  const [deleteVersionTarget, setDeleteVersionTarget] = useState(null);
  const [restoringVersionId, setRestoringVersionId] = useState("");
  const [deletingVersionId, setDeletingVersionId] = useState("");
  const [workspaceMode, setWorkspaceMode] = useState("code-preview");
  const [fullscreenPreviewOpen, setFullscreenPreviewOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const debouncedCode = useDebounce(code, 500);
  const fullscreenPreviewDoc = buildPreviewDocument(debouncedCode);

  async function fetchProject() {
    const response = await getProjectById(id);
    setProject(response.project);
    setCode(response.project?.current_code || "");
  }

  async function fetchConversations() {
    const response = await getConversations(id);
    setMessages(response.conversations || []);
  }

  async function fetchVersions() {
    const response = await getVersions(id);
    setVersions(response.versions || []);
    setCurrentVersionIndex(response.currentVersionIndex || "");
  }

  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      await Promise.all([
        fetchProject(),
        fetchConversations(),
        fetchVersions(),
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load project editor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, [id]);

  async function handleSendMessage(content) {
    if (!assertVerified()) return;

    setAssistantLoading(true);
    const optimisticUser = {
      _id: `tmp-user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((current) => [...current, optimisticUser]);

    try {
      await addMessage(id, { content, role: "user" });
      const editResponse = await editProject(id, { prompt: content });
      const updatedProject = editResponse.project;
      const assistantContent =
        updatedProject?.current_code || "No code update generated.";

      await addMessage(id, {
        content: assistantContent,
        role: "assistant",
      });

      setProject(updatedProject);
      setCode(updatedProject?.current_code || "");

      await Promise.all([fetchConversations(), fetchVersions()]);
      toast.success("Project updated by AI");
    } catch (apiError) {
      toast.error(
        apiError.response?.data?.message || "Unable to process AI update",
      );
      await fetchConversations();
    } finally {
      setAssistantLoading(false);
    }
  }

  async function handleSaveVersion(values) {
    setSaveVersionLoading(true);

    try {
      const response = await saveVersion(id, values);
      toast.success(response.message || "Version saved");
      setSaveVersionOpen(false);
      await fetchVersions();
    } catch (apiError) {
      toast.error(apiError.response?.data?.message || "Unable to save version");
    } finally {
      setSaveVersionLoading(false);
    }
  }

  async function handleQuickSaveVersion() {
    if (saveVersionLoading) return;

    setSaveVersionLoading(true);
    try {
      await saveVersion(id, {
        description: `Shortcut save ${new Date().toLocaleString()}`,
      });
      toast.success("Version saved (Ctrl+S)");
      await fetchVersions();
    } catch (apiError) {
      toast.error(apiError.response?.data?.message || "Unable to save version");
    } finally {
      setSaveVersionLoading(false);
    }
  }

  async function handleTogglePublish() {
    if (!project) return;

    setPublishLoading(true);
    try {
      await updateProjectVisibility(project._id, !project.isPublished);
      setProject((current) => ({
        ...current,
        isPublished: !current.isPublished,
      }));
      toast.success("Project visibility updated");
    } catch (apiError) {
      toast.error(
        apiError.response?.data?.message || "Unable to update visibility",
      );
    } finally {
      setPublishLoading(false);
    }
  }

  async function performRestore(versionId) {
    setRestoringVersionId(versionId);
    try {
      const response = await restoreVersion(id, versionId);
      setProject(response.project);
      setCode(response.project?.current_code || "");
      await fetchVersions();
      toast.success("Version restored");
    } catch (apiError) {
      toast.error(
        apiError.response?.data?.message || "Unable to restore version",
      );
    } finally {
      setRestoringVersionId("");
    }
  }

  async function handleRestoreVersion() {
    if (!restoreTarget) return;

    await performRestore(restoreTarget._id);
    setRestoreTarget(null);
  }

  async function handleDeleteVersion() {
    if (!deleteVersionTarget) return;

    setDeletingVersionId(deleteVersionTarget._id);
    try {
      await deleteVersion(id, deleteVersionTarget._id);
      toast.success("Version deleted");
      setDeleteVersionTarget(null);
      await fetchVersions();
    } catch (apiError) {
      toast.error(
        apiError.response?.data?.message || "Unable to delete version",
      );
    } finally {
      setDeletingVersionId("");
    }
  }

  if (loading) return <AppSpinner label="Loading project editor..." />;

  if (error) {
    return (
      <ErrorState
        title="Failed to open project"
        message={error}
        onRetry={fetchAll}
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <Button
          as={Link}
          to="/projects"
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto"
        >
          Back to Projects
        </Button>
        <Button
          as={Link}
          to={`/projects/${project._id}/settings`}
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto"
        >
          Project Settings
        </Button>
      </div>

      <ProjectTopBar
        project={project}
        onOpenVersions={() => setVersionDrawerOpen(true)}
        onSaveVersion={() => setSaveVersionOpen(true)}
        onTogglePublish={handleTogglePublish}
        publishLoading={publishLoading}
        saveVersionLoading={saveVersionLoading}
        workspaceMode={workspaceMode}
        onWorkspaceModeChange={setWorkspaceMode}
        onOpenFullscreenPreview={() => setFullscreenPreviewOpen(true)}
      />

      <Suspense fallback={<AppSpinner label="Loading editor workspace..." />}>
        <EditorLayout
          projectId={id}
          code={code}
          onCodeChange={setCode}
          theme={theme}
          workspaceMode={workspaceMode}
          chatPane={
            <ChatWindow
              messages={messages}
              loading={assistantLoading}
              onSend={handleSendMessage}
            />
          }
          onSaveVersion={handleQuickSaveVersion}
          saveVersionLoading={saveVersionLoading}
        />
      </Suspense>

      <ProjectMetadataCard project={project} />

      <VersionDrawer
        open={versionDrawerOpen}
        versions={versions}
        currentVersionIndex={currentVersionIndex}
        onClose={() => setVersionDrawerOpen(false)}
        onRestore={(version) => setRestoreTarget(version)}
        onDelete={(version) => setDeleteVersionTarget(version)}
        restoringVersionId={restoringVersionId}
        deletingVersionId={deletingVersionId}
        onCompare={() => setCompareModalOpen(true)}
      />

      <SaveVersionModal
        open={saveVersionOpen}
        onClose={() => setSaveVersionOpen(false)}
        onSubmit={handleSaveVersion}
        loading={saveVersionLoading}
      />

      <RestoreVersionDialog
        open={Boolean(restoreTarget)}
        onClose={() => setRestoreTarget(null)}
        onConfirm={handleRestoreVersion}
        loading={Boolean(restoringVersionId)}
      />

      <ConfirmDialog
        open={Boolean(deleteVersionTarget)}
        onCancel={() => setDeleteVersionTarget(null)}
        onConfirm={handleDeleteVersion}
        loading={Boolean(deletingVersionId)}
        title="Delete this version?"
        description="Deleted versions cannot be recovered."
        confirmLabel="Delete"
      />

      <Modal
        open={fullscreenPreviewOpen}
        onClose={() => setFullscreenPreviewOpen(false)}
        title="Fullscreen Preview"
        description="Preview the latest debounced project output."
        className="max-w-screen-2xl sm:max-w-screen"
      >
        <div className="h-[82vh]   overflow-hidden rounded-xl border border-ink/10 bg-white">
          <iframe
            title="Fullscreen project preview"
            srcDoc={fullscreenPreviewDoc}
            sandbox="allow-scripts allow-modals allow-forms"
            className="h-full w-full overflow-hidden"
          />
        </div>
      </Modal>

      <Suspense fallback={null}>
        <VersionCompareModal
          open={compareModalOpen}
          onClose={() => setCompareModalOpen(false)}
          versions={versions}
          currentVersionIndex={currentVersionIndex}
          onRestoreVersion={async (version) => {
            if (!version?._id) return;
            await performRestore(version._id);
            setCompareModalOpen(false);
          }}
          restoreLoading={Boolean(restoringVersionId)}
          theme={theme}
        />
      </Suspense>
    </section>
  );
}
