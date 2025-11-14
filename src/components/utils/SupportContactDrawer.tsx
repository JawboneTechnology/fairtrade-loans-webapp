import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { BottomDrawer, FloatingInput, Spinner } from "@/components";
import useServerSideQueries from "@/hooks/useServerSideQueries";
import { toast } from "sonner";

interface SupportContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportContactDrawer = ({ isOpen, onClose }: SupportContactDrawerProps) => {
  const { sendSupportMessage } = useServerSideQueries();
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSendingSupport, setIsSendingSupport] = useState<boolean>(false);

  const handleSupportFormChange = (field: string, value: string) => {
    setSupportForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return supportForm.name.trim() !== '' &&
      supportForm.email.trim() !== '' &&
      supportForm.subject.trim() !== '' &&
      supportForm.message.trim() !== '';
  };

  const handleSupportSubmit = async () => {
    if (!isFormValid() || isSendingSupport) return;

    setIsSendingSupport(true);
    try {
      const response = await sendSupportMessage(supportForm);

      // Show success message
      toast.success("Message sent successfully!", {
        description: response.message || "Our support team will get back to you within 24 hours.",
        duration: 5000,
      });

      // Reset form
      setSupportForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Close drawer after a short delay for better UX
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Error sending support message:", error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsSendingSupport(false);
    }
  };

  const handleClose = () => {
    if (!isSendingSupport) {
      onClose();
    }
  };

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={handleClose}
      drawerHeight="100vh"
      showCloseButton={!isSendingSupport}
    >
      <div className="p-6 space-y-4 pt-16">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-dark mb-2">Contact Support</h2>
          <div className="text-3xl mb-2">📧</div>
          <p className="text-gray-600 text-sm">
            Fill out the form below and our support team will get back to you within 24 hours.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <FloatingInput
              id="support-name"
              label="Full Name"
              value={supportForm.name}
              onChange={(e) => handleSupportFormChange('name', e.target.value)}
              type="text"
              required
              className="w-full"
              disabled={isSendingSupport}
            />
          </div>

          <div>
            <FloatingInput
              id="support-email"
              label="Email Address"
              value={supportForm.email}
              onChange={(e) => handleSupportFormChange('email', e.target.value)}
              type="email"
              required
              className="w-full"
              disabled={isSendingSupport}
            />
          </div>

          <div>
            <FloatingInput
              id="support-subject"
              label="Subject"
              value={supportForm.subject}
              onChange={(e) => handleSupportFormChange('subject', e.target.value)}
              type="text"
              required
              className="w-full"
              disabled={isSendingSupport}
            />
          </div>

          <div>
            <div className="relative">
              <textarea
                id="support-message"
                value={supportForm.message}
                onChange={(e) => handleSupportFormChange('message', e.target.value)}
                required
                rows={4}
                disabled={isSendingSupport}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all ${isSendingSupport
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  : 'border-gray-300'
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="support-message"
                className={`absolute font-normal left-3 transition-all duration-200 ease-in-out pointer-events-none ${supportForm.message.length > 0
                  ? "text-sm -top-3.5 bg-white px-1 text-primary"
                  : "top-3.5 text-gray-300"
                  } peer-focus:text-sm peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary`}
              >
                Message
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSupportSubmit}
            disabled={!isFormValid() || isSendingSupport}
            className={`w-full font-semibold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-200 ${isFormValid() && !isSendingSupport
              ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {isSendingSupport ? (
              <>
                <Spinner size="sm" color="text-gray-500" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="text-lg" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            We typically respond within 24 hours. You can also reach us at{' '}
            <a href="mailto:support@fairtrade.com" className="text-primary hover:underline">
              support@fairtrade.com
            </a>
          </p>
        </div>
      </div>
    </BottomDrawer>
  );
};

export default SupportContactDrawer;

