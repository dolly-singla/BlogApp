import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises';
import { request } from "http";
const { NextResponse } = require("next/server");
const fs = require('fs');

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  try {
    if (blogId) {
      const blog = await BlogModel.findOne({ _id: blogId });
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ success: false, msg: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json({ success: false, msg: "No image uploaded" }, { status: 400 });
    }

    const timestamp = Date.now();
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${timestamp}_${image.name}`;
    const path = `public/${filename}`; // ✅ no leading ./ needed
    await writeFile(path, buffer);
    const imgUrl = `/${filename}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl, // ✅ stored in DB
      authorImg: imgUrl
    }; 

    await BlogModel.create(blogData);
    console.log("✅ Blog saved:", blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (err) {
    console.error("❌ POST /api/blog error:", err);
    return NextResponse.json({ success: false, msg: "Internal Server Error", error: err.message }, { status: 500 });
  }
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) { 
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"});
  
}