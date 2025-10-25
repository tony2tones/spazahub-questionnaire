import Link from "next/link";

export default function NavMenu({ nextStepUrl }: { nextStepUrl?: string }) {
  return (
    <div className="flex flex-col gap-2 w-full text-center hover:cursor-pointer">
      {nextStepUrl && (
        <Link
          href={nextStepUrl}
          className="p-4 bg-green-500 text-black rounded hover:bg-green-600"
        >
          Click to Continue to Next Step Registration questions
        </Link>
      )}
      <Link
        href={"/"}
        className="p-4 bg-green-500 text-black rounded hover:bg-green-600"
      >
        Back home
      </Link>
    </div>
  );
}
