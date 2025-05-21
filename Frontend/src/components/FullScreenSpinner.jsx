function FullScreenSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default FullScreenSpinner;
