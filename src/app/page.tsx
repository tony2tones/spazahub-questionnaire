import CartIcon from "@/components/ui/icons/CartIcon";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-8 text-center">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4">
        <h1 className="text-3xl sm:text-5xl font-bold flex items-center flex-wrap justify-center gap-2">
          Welcome to the{" "}
                  <span className="flex items-center whitespace-nowrap">
          Spaza<span className="text-green-500">Hub</span>
          <CartIcon width={70} height={70} color="#00c950" />
        </span>
          Questionnaire
        </h1>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 dark:border-white w-full sm:w-1/2 my-4" />

      {/* Content */}
      <div className="max-w-md w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Where to start
        </h2>
        <div className="flex flex-col gap-3 pb-2">
          <Link
            href="/company-questions"
            className="p-3 sm:p-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
          >
            Go to Company Questions
          </Link>
          <Link
            href="/supplier-questions"
            className="p-3 sm:p-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
          >
            Go to Supplier and Stock Questions
          </Link>
        </div>

      <hr className="border-t border-gray-300 dark:border-white w-full my-4" />
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Why the questions?
        </h2>
        <article className="mt-6 text-left text-sm sm:text-base justify-center" 
        >
          The SpazaHub questionnaire is designed to understand the real needs and daily challenges of Spaza Shop owners. By gathering this information, SpazaHub aims to create practical solutions that help shop owners grow their business, access better Financial Support, and build stronger connections with suppliers. Our goal is to use these insights to drive real change and support sustainable growth within the Spaza shop industry.
        </article>
      </div>
    </section>
  );
}
