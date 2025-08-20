import { useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PaperViewer from "@/PaperViewer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sanction from "@/Documents/Sanction";
import SanctionForm from "@/Forms/SanctionForm";

const App = () => {
  const [formData, setFormData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Cleanup previous URL
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setPdfLoading(true);

    const newTimer = setTimeout(async () => {
      try {
        const blob = await pdf(<Sanction formData={formData} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setPdfLoading(false);
      }
    }, 500);

    setDebounceTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [formData]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow px-6 py-12 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Cha-Ching</h1>
            <p className="text-xl text-muted-foreground">
              Create Sanction with ease
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
              {/* Form Section */}
              <div className="lg:w-[400px] p-8 border-r border-gray-100">
                <div className="space-y-6">
                  <SanctionForm onFormDataChange={setFormData} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <PDFDownloadLink
                    document={<Sanction formData={formData} />}
                    fileName="Event_Sanction_Form.pdf"
                  >
                    {({ loading }) => (
                      <Button
                        className="w-full transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Preparing Download..." : "Download PDF"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>

              {/* PDF Viewer Section */}
              <div className="flex-1 p-8 bg-gray-50 rounded-r-2xl">
                <div className="h-full">
                  {pdfLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <div className="text-gray-500">Generating PDF preview...</div>
                      </div>
                    </div>
                  ) : pdfUrl ? (
                    <PaperViewer url={pdfUrl} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p className="text-lg mb-2">PDF Preview</p>
                        <p className="text-sm">Fill out the form to see the preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;