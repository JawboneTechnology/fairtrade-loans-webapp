import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { UniversalButton } from "@/components";
import { CompanyLogo } from "@/constants/ImageConstants";

const NotFoundScreen = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearchLoans = () => {
    navigate("/loans");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Mobile-first container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <img
            src={CompanyLogo}
            alt="Fairtrade Foundation"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4"
          />
        </motion.div>

        {/* Animated 404 Text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-2">
            404
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-dark mb-3 sm:mb-4">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-dark/70 leading-relaxed max-w-lg mx-auto px-2">
            Oops! The page you're looking for seems to have wandered off. Don't
            worry, let's get you back to managing your loans and grants.
          </p>
        </motion.div>

        {/* Animated Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-secondary rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary rounded-full opacity-40"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          {/* Primary Action - Go Home */}
          <UniversalButton
            title="Go to Profile"
            handleClick={handleGoHome}
            icon={<Home className="w-4 h-4 sm:w-5 sm:h-5" />}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-3 sm:py-4 text-sm sm:text-base shadow-lg hover:shadow-xl"
          />

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <UniversalButton
              title="Go Back"
              handleClick={handleGoBack}
              icon={<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full bg-white hover:bg-light text-primary font-medium rounded-lg px-4 py-3 text-sm sm:text-base border-2 border-primary hover:border-primary/80 transition-colors"
            />

            <UniversalButton
              title="View Loans"
              handleClick={handleSearchLoans}
              icon={<Search className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full bg-secondary/20 hover:bg-secondary/30 text-dark font-medium rounded-lg px-4 py-3 text-sm sm:text-base border border-secondary hover:border-secondary/80 transition-colors"
            />
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <p className="text-xs sm:text-sm text-dark/60">
            Need help? Contact our support team or visit our{" "}
            <button
              onClick={handleGoHome}
              className="text-primary hover:text-primary/80 underline font-medium"
            >
              help center
            </button>
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full opacity-30"></div>
        <div className="absolute top-1/4 right-8 w-1 h-1 sm:w-2 sm:h-2 bg-secondary rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-primary rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
