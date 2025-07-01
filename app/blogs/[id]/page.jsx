"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddBlogModal from "@/components/ui/AddBlogModal"
import EditBlogModal from "@/components/ui/EditBlogModal"

export default function BlogPage() {
    const router = useRouter()

    const [blogs, setBlogs] = useState([])
    const [addBlog, setAddBlog] = useState(null)
    const [editBlog, setEditBlog] = useState(null)
    const [publishDate, setPublishDate] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("/api/blog/getBlog")
                setBlogs(res.data)
            } catch (error) {
                toast.error("Failed to fetch blogs")
            }
        }
        fetchEvents()
    }, [])

    useEffect(() => {
        const isModalOpen = !!addBlog || !!editBlog
        document.body.style.overflow = isModalOpen ? "hidden" : "auto"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [addBlog, editBlog])

    const onDeleteBlog = async (blogId) => {
        try {
            await axios.delete("/api/blog/deleteBlog", {
                data: { id: blogId },
            })
            toast.success("Blog deleted successfully")
            setBlogs((prev) => prev.filter((m) => m.id !== blogId))
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to delete blog")
        }
    }

    const changeStatus = async (blog) => {
        try {
            setPublishDate(true)
            const res = await axios.put("/api/blog/updateStatus", {
                id: blog.id,
                status: "PUBLISHED",
                publishedAt: new Date().toISOString(),
            })
            const updated = res.data
            setBlogs((prev) =>
                prev.map((b) => (b.id === updated.id ? updated : b))
            )
            toast.success("Blog successfully published")
        } catch (error) {
            toast.error("Failed to publish blog")
            console.log(error.message)
        }
    }

    const handleAddBlog = async (newBlog) => {
        setBlogs((prev) => [...prev, newBlog])
    }

    const handleEditBlog = async (updatedBlog) => {
        setBlogs((prev) =>
            prev.map((e) => (e.id === updatedBlog.id ? updatedBlog : e))
        )
    }

    const formatCustomDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = date.getDate()
        const monthName = date.toLocaleString("en-US", { month: "long" })
        const year = date.getFullYear()
        const getDaySuffix = (d) => {
            if (d >= 11 && d <= 13) return "th"
            switch (d % 10) {
                case 1: return "st"
                case 2: return "nd"
                case 3: return "rd"
                default: return "th"
            }
        }
        return `${day}${getDaySuffix(day)} ${monthName}, ${year}`
    }

    const Card = ({ blog }) => {
        return (
            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-orange-100 backdrop-blur-md transition-all duration-300 hover:scale-[1.015]">
                {blog.coverImage && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={blog.coverImage}
                            alt={`${blog.title} image`}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-3 px-6 py-5">
                    <h3 className="text-lg font-bold text-orange-900 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-700 line-clamp-3">{blog.desc}</p>

                    <div className="flex flex-wrap gap-2 text-xs font-medium text-orange-600">
                        {blog.tags.map((tag, idx) => (
                            <span key={idx} className="rounded-full bg-orange-100 px-2 py-0.5">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-2 flex flex-col gap-1 text-xs text-gray-500">
                        {blog.author && <span>👤 {blog.author}</span>}
                        <span>📌 Status: {blog.status}</span>
                        {blog.publishedAt && (
                            <span>📅 {formatCustomDate(blog.publishedAt)}</span>
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap justify-start gap-3">
                        {blog.status === "DRAFT" && (
                            <button
                                onClick={() => changeStatus(blog)}
                                disabled={publishDate}
                                className="rounded-full bg-green-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-green-600"
                            >
                                Publish
                            </button>
                        )}
                        <button
                            onClick={() => setEditBlog(blog)}
                            className="rounded-full bg-blue-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteBlog(blog.id)}
                            className="rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-100 px-6 py-12">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <button
                        onClick={() =>
                            setAddBlog({
                                id: "",
                                title: "",
                                content: "",
                                desc: "",
                                coverImage: "",
                                tags: [],
                                author: "",
                                status: "DRAFT",
                                publishedAt: "",
                            })
                        }
                        className="rounded-lg bg-orange-500 px-6 py-3 text-white shadow-md transition hover:bg-orange-600"
                    >
                        Add Blog
                    </button>

                    <div className="w-full sm:w-1/2">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by title"
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs
                        .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
                        .map((blog) => (
                            <Card key={blog.id} blog={blog} />
                        ))}
                </div>

                {addBlog && (
                    <AddBlogModal
                        blog={addBlog}
                        onClose={() => setAddBlog(null)}
                        onAdd={handleAddBlog}
                    />
                )}

                {editBlog && (
                    <EditBlogModal
                        blog={editBlog}
                        onClose={() => setEditBlog(null)}
                        onEdit={handleEditBlog}
                    />
                )}
            </div>
        </div>
    )
}
