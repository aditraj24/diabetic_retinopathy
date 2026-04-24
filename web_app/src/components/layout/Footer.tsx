export function Footer() {
  return (
    <footer className="w-full bg-white/50 backdrop-blur-sm border-t border-teal/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-secondary">
        <p>© {new Date().getFullYear()} DR-Vision Clinical Systems. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-teal-dark transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-teal-dark transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-teal-dark transition-colors cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
}
