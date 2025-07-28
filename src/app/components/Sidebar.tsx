import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0 h-screen">
      <nav className="h-full p-6">
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/generate"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              Generate Text
            </Link>
          </li>
          <li>
            <Link
              href="/stream"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              Stream text
            </Link>
          </li>
          <li>
            <Link
              href="/system"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              System prompts
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              Message histories
            </Link>
          </li>
          <li>
            <Link
              href="/structured-output"
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              Structured Output
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
