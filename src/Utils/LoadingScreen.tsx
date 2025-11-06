export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 animate-fadeIn z-99">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
