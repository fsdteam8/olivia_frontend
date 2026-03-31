"use client";
import PageHero from "@/components/home/PageHero";
import React from "react";
import BlogGallery from "./BlogGallery";
import SubmitBlogBanner from "./SubmitBlogBanner";
import CommunitySection from "@/components/home/CommunitySection";
import Footer from "@/components/home/Footer";
import CreateBlogModal from "./CreateBlogModal";

const BlogMain = () => {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = React.useState(false);

  return (
    <div>
      <PageHero
        setOpen={setIsCreateBlogOpen}
        bgImage="/blog.jpg"
        subtitle="Transforming Workplaces with End-to-End IWMS Solutions Like Consulting, Implementation, Integration, and Support All in One Place"
        title="Our Blog"
        buttonTitle="Submit a Blog for Us"
      />
      <BlogGallery />
      <SubmitBlogBanner />
      <CommunitySection />
      <Footer />
      <CreateBlogModal
        isOpen={isCreateBlogOpen}
        setOpen={setIsCreateBlogOpen}
      />
    </div>
  );
};

export default BlogMain;
