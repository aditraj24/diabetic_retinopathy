export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} DR-Vision Clinical Systems. All rights reserved.</p>
        <div className="flex gap-5 mt-3 md:mt-0">
          <span className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">
            Support
          </span>
        </div>
      </div>
    </footer>
  );
}