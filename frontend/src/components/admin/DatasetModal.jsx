import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save } from 'lucide-react'
import api from '../../lib/api'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'

const TYPES = ['function', 'class', 'documentation', 'function_implementation', 'class_implementation', 'docstring_generation']
const SOURCES = ['github_repository']
const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'go', 'rust', 'cpp', 'csharp', 'ruby', 'php']
const FRAMEWORKS = ['pytorch', 'tensorflow', 'django', 'flask', 'transformers', 'spacy', 'numpy', 'pandas', 'scikit-learn', 'opencv']
const DOC_TYPES = ['docstring', 'inline_comment', 'readme', 'wiki', 'api_ref']
const CODE_ELEMENTS = ['function_def', 'class_def', 'method_def', 'variable', 'import']
const CATEGORIES = ['nlp', 'computer_vision', 'reinforcement_learning', 'data_processing', 'web', 'api', 'testing', 'devops']

export default function DatasetModal({ dataset, onClose, onSuccess }) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    type: TYPES[0],
    repo: '',
    source: SOURCES[0],
    language: '',
    framework: '',
    category: '',
    docType: '',
    codeElement: '',
    task: '',
    model: '',
    library: '',
    instruction: '',
    input: '',
    output: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (dataset) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        type: dataset.type || TYPES[0],
        repo: dataset.repo || '',
        source: dataset.source || SOURCES[0],
        language: dataset.language || '',
        framework: dataset.framework || '',
        category: dataset.category || '',
        docType: dataset.docType || '',
        codeElement: dataset.codeElement || '',
        task: dataset.task || '',
        model: dataset.model || '',
        library: dataset.library || '',
        instruction: dataset.instruction || '',
        input: dataset.input || '',
        output: dataset.output || '',
      })
    }
  }, [dataset])

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { ...form }
      if (!payload.language) delete payload.language
      if (!payload.framework) delete payload.framework
      if (!payload.category) delete payload.category
      if (!payload.docType) delete payload.docType
      if (!payload.codeElement) delete payload.codeElement
      if (!payload.task) delete payload.task
      if (!payload.model) delete payload.model
      if (!payload.library) delete payload.library

      if (dataset) {
        await api.put(`/datasets/${dataset._id}`, payload)
        toast({ message: 'Dataset updated', type: 'success' })
      } else {
        await api.post('/datasets', payload)
        toast({ message: 'Dataset created', type: 'success' })
      }
      onSuccess()
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save dataset'
      setError(msg)
      toast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl glass-card rounded-2xl shadow-2xl p-6 md:p-8 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">
            {dataset ? 'Edit Dataset' : 'Add New Dataset'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Repo *</label>
              <input
                name="repo"
                value={form.repo}
                onChange={handle}
                required
                placeholder="e.g. facebook/react"
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                <option value="">-- None --</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Framework</label>
              <select
                name="framework"
                value={form.framework}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                <option value="">-- None --</option>
                {FRAMEWORKS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                <option value="">-- None --</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Doc Type</label>
              <select
                name="docType"
                value={form.docType}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                <option value="">-- None --</option>
                {DOC_TYPES.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Code Element</label>
              <select
                name="codeElement"
                value={form.codeElement}
                onChange={handle}
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              >
                <option value="">-- None --</option>
                {CODE_ELEMENTS.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Task</label>
              <input
                name="task"
                value={form.task}
                onChange={handle}
                placeholder="e.g. text_classification"
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Model</label>
              <input
                name="model"
                value={form.model}
                onChange={handle}
                placeholder="e.g. gpt-4, llama-3"
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Library</label>
              <input
                name="library"
                value={form.library}
                onChange={handle}
                placeholder="e.g. transformers, torch"
                className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Instruction *</label>
            <textarea
              name="instruction"
              value={form.instruction}
              onChange={handle}
              required
              rows={2}
              className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Input *</label>
            <textarea
              name="input"
              value={form.input}
              onChange={handle}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Output *</label>
            <textarea
              name="output"
              value={form.output}
              onChange={handle}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl bg-surface-alt border border-border text-text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading} className="gap-2">
              <Save className="h-4 w-4" />
              {dataset ? 'Update Dataset' : 'Create Dataset'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
