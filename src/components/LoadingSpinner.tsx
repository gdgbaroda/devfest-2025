export default function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="h-96 flex items-center justify-center bg-gray-50/50 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <div className="animate-pulse text-gray-500 text-sm">{message}</div>
      </div>
    </div>
  );
}
