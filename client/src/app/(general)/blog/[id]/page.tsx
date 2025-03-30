import PreviousPage from "@/components/PreviousPage";
import AuthorButton from "@/components/AuthorButton";
import mockBlog from "@/mock/mockblog.json";
import { BlogImageCard } from "@/components/Card";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function BlogList({ params }: { params: { id: string } }) {
  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/Blog/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.warn("Error fetching blog data:", error);
      const mockBlogById = mockBlog.find((blog) => blog.id === Number(id));
      if (mockBlogById) {
        return mockBlogById;
      }
      return mockBlog;
    }
  };

  const { id } = params;
  const data = await fetchBlog(id);

  if (!data) {
    return (
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-semibold mt-16">
          Workshop not found
        </h1>
      </div>
    );
  }
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
                author={data?.author_name}
                link_name="@socialmedia"
                avatar={data?.author_avatar}
              />
            </div>
          </div>
          <h1 className="text-start text-4xl font-bold mt-6">{data?.title}</h1>
          <div className="text-start font-sans mt-8 text-lg text-default-700">
            <p className="block text-lg mb-4">{data?.description}</p>
            <BlogImageCard
              image={data?.image_url}
              className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="block text-lg mt-6 text-default-700">
              <MarkdownRenderer content={data?.content || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
