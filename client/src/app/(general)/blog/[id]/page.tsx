import PreviousPage from "@/components/PreviousPage";
import AuthorButton from "@/components/AuthorButton";
import mockBlog from "@/mock/mockblog.json";
import { BlogImageCard } from "@/components/Card";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function BlogList({ params }: { params: { id: string } }) {
  const mockblog = (await params).id;
  const blogitem = mockBlog.find((item) => item.id === Number(mockblog));

  return (
    <div className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <div className="absolute top-0 left-6">
          <PreviousPage path="/blog" />
        </div>
        <div className="w-full">
          <div className="text-start font-sans mt-14 text-lg text-default ">
            <p className="block text-sm mb-2">
              Published on
              {/* {blogitem?.create_date} */}
            </p>
            <div className="mb-3 flex w-full flex-col items-start">
              <AuthorButton
                link="#"
                author={blogitem?.author_name}
                link_name="@socialmedia"
                avatar={blogitem?.author_avatar}
              />
            </div>
          </div>
          <h1 className="text-start text-4xl font-bold mt-6">
            {blogitem?.title}
          </h1>
          <div className="text-start font-sans mt-8 text-lg text-default-700">
            <p className="block text-lg mb-4">{blogitem?.description}</p>
            <BlogImageCard
              image={blogitem?.image_url}
              className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="block text-lg mt-6 text-default-700">
              <MarkdownRenderer content={blogitem?.content || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
