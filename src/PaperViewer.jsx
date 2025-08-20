import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Tell pdf.js where to find the worker
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
const PaperViewer = ({ url }) => {
  return (
    <div className="overflow-auto w-full h-full flex justify-center">
      <Document
        file={url}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-gray-400">Loading PDF...</div>
          </div>
        }
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={1.5}
          className="max-w-full"
        />
      </Document>
    </div>
  );
};

export default PaperViewer;