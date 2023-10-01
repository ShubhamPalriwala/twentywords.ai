export default function QuestionComponent({ text }: { text: string }) {
  return (
    <div className="flex justify-end pb-2">
      <div
        key={"index3"}
        className="min-w-3/12 max-w-9/12 bg-opacity-60 border border-white rounded shadow-md flex items-center justify-start overflow-hidden"
        style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}
      >
        <p className="text-white text-sm font-normal break-words px-2 py-2">
          {text}
        </p>
      </div>
    </div>
  );
}
