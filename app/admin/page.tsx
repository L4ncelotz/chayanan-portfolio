"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, Save, X, ExternalLink, RefreshCw } from "lucide-react"

type Category = {
    id: string
    name: string
    color: string
}

type Skill = {
    id: string
    name: string
    color: string
}

type Certificate = {
    id: string
    title: string
    issuer: string
    description?: string
    imageUrl: string
    link?: string
    issuedDate: string
    featured: boolean
    categoryId: string
    category: Category
    skills: Skill[]
}

type FormData = {
    title: string
    issuer: string
    description: string
    imageUrl: string
    link: string
    issuedDate: string
    featured: boolean
    categoryId: string
    skills: string[]
}

export default function AdminPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        title: "",
        issuer: "",
        description: "",
        imageUrl: "",
        link: "",
        issuedDate: "",
        featured: false,
        categoryId: "",
        skills: [],
    })

    // Fetch data on mount
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [certsRes, catsRes] = await Promise.all([
                fetch('/api/certificates'),
                fetch('/api/categories'),
            ])
            const certs = await certsRes.json()
            const cats = await catsRes.json()
            setCertificates(certs)
            setCategories(cats)
        } catch (error) {
            console.error('Failed to fetch data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (cert: Certificate) => {
        setEditingId(cert.id)
        setFormData({
            title: cert.title,
            issuer: cert.issuer,
            description: cert.description || "",
            imageUrl: cert.imageUrl,
            link: cert.link || "",
            issuedDate: new Date(cert.issuedDate).toISOString().split('T')[0],
            featured: cert.featured,
            categoryId: cert.categoryId,
            skills: cert.skills.map(s => s.name),
        })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const url = editingId
                ? `/api/certificates/${editingId}`
                : '/api/certificates'
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                await fetchData()
                setEditingId(null)
                setShowAddForm(false)
                resetForm()
            } else {
                alert('Failed to save certificate')
            }
        } catch (error) {
            console.error('Save error:', error)
            alert('Failed to save certificate')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return

        try {
            const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' })
            if (res.ok) {
                await fetchData()
            } else {
                alert('Failed to delete certificate')
            }
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            issuer: "",
            description: "",
            imageUrl: "",
            link: "",
            issuedDate: new Date().toISOString().split('T')[0],
            featured: false,
            categoryId: categories[0]?.id || "",
            skills: [],
        })
    }

    const openAddForm = () => {
        resetForm()
        setShowAddForm(true)
        setEditingId(null)
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <header className="border-b border-gray-800 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                        <p className="text-sm text-gray-500">Manage your certificates</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchData}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <a
                            href="/"
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Portfolio
                        </a>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Certificates" value={certificates.length.toString()} />
                    <StatCard label="Featured" value={certificates.filter(c => c.featured).length.toString()} />
                    <StatCard label="Categories" value={categories.length.toString()} />
                    <StatCard label="Connected to" value="Neon DB" highlight />
                </div>

                {/* Add Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Certificates</h2>
                    <button
                        onClick={openAddForm}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Certificate
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-6 rounded-xl bg-[#0a0a0a] border border-gray-800"
                    >
                        <CertificateForm
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                            onSave={handleSave}
                            onCancel={() => setShowAddForm(false)}
                            saving={saving}
                        />
                    </motion.div>
                )}

                {/* Certificates List */}
                <div className="space-y-4">
                    {certificates.map((cert) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 hover:border-gray-700 transition-colors"
                        >
                            {editingId === cert.id ? (
                                <CertificateForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    categories={categories}
                                    onSave={handleSave}
                                    onCancel={() => setEditingId(null)}
                                    saving={saving}
                                />
                            ) : (
                                <div className="flex items-center gap-4">
                                    {/* Image */}
                                    <div className="w-20 h-14 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                                        <img
                                            src={cert.imageUrl}
                                            alt={cert.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold truncate">{cert.title}</h3>
                                            {cert.featured && (
                                                <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {cert.issuer} • {new Date(cert.issuedDate).toLocaleDateString()}
                                        </p>
                                        <div className="flex gap-1 mt-1">
                                            {cert.skills.slice(0, 3).map((skill) => (
                                                <span key={skill.id} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded">
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        {cert.link && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleEdit(cert)}
                                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {certificates.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No certificates yet. Click &quot;Add Certificate&quot; to get started.
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800">
            <div className={`text-2xl font-bold ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    )
}

function CertificateForm({
    formData,
    setFormData,
    categories,
    onSave,
    onCancel,
    saving,
}: {
    formData: FormData
    setFormData: (data: FormData) => void
    categories: Category[]
    onSave: () => void
    onCancel: () => void
    saving: boolean
}) {
    const [skillInput, setSkillInput] = useState("")

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()],
            })
            setSkillInput("")
        }
    }

    const removeSkill = (index: number) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((_, i) => i !== index),
        })
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Certificate title"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Issuer *</label>
                    <input
                        type="text"
                        value={formData.issuer}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Organization name"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows={2}
                    placeholder="Brief description"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Image URL *</label>
                    <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Certificate Link</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="https://verify..."
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Date *</label>
                    <input
                        type="date"
                        value={formData.issuedDate}
                        onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-400">Featured certificate</label>
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-1">Skills</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Add skill..."
                    />
                    <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(i)}
                                className="text-gray-500 hover:text-red-400"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    disabled={saving}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving || !formData.title || !formData.issuer || !formData.imageUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Saving...' : 'Save Certificate'}
                </button>
            </div>
        </div>
    )
}
