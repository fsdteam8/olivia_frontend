"use client";
import PageHero from "@/components/home/PageHero";
import React from "react";
import BlogGallery from "./BlogGallery";
import SubmitBlogBanner from "./SubmitBlogBanner";
import CommunitySection from "@/components/home/CommunitySection";
import CreateBlogModal from "./CreateBlogModal";

const BlogMain = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = React.useState(false);

  return (
    <div>
      <PageHero
        setOpen={setIsCreateBlogOpen}
        bgImage="/blog.jpg"
        subtitle="Explore insights, ideas, and stories on climate action, careers, innovation, and the people and organizations working to create a more sustainable future."
        title="Our Blog"
        buttonTitle="Submit a Blog for Us"
      />
      <BlogGallery />
      <SubmitBlogBanner />
      <CommunitySection />
      <CreateBlogModal
        isOpen={isCreateBlogOpen}
        setOpen={setIsCreateBlogOpen}
      />
    </div>
  );
};

export default BlogMain;
