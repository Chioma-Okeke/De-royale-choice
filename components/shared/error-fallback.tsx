type ErrorFallbackProps = {
    errorMessage?: string;
    onRetry?: () => void;
};

export default function ErrorFallback({ errorMessage = "Something went wrong.", onRetry }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-red-50 text-red-800 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p className="mb-4">{errorMessage}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
