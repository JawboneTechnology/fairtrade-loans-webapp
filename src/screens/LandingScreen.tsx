import { Link } from "react-router-dom";
import { CompanyLogo, IPhone13ProMax, IPadMini, MacbookAir, GalaxyS21Ultra } from "@/constants/ImageConstants";
import { QRCodeGenerator } from "@/components";
import { FaArrowRight, FaGift, FaBell } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, fadeIn, scaleIn } from "@/animations/landingAnimations";
import FadeInAnime from '@/animations/FadeInAnime';
import { AnimatedTitle } from "@/animations/AnimatedTitle";

const LandingScreen = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <>
      <div className="min-h-screen w-full bg-white relative pb-16">
        {/* White Grid with Dots Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
            radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px, 20px 20px, 20px 20px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />

        {/* Top nav */}
        <div className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={CompanyLogo}
                alt="Fairtrade Foundation"
                className="h-14 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-brand font-bold leading-tight">
                  JSTL Loans
                </div>
                <div className="text-xs text-dark/60">
                  Loans, grants, payments, and notifications
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}>
                <Link
                  to="/auth-login"
                  className="inline-flex items-center justify-center px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white transition-all"
                >
                  Access Account
                </Link>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          className="relative z-10 max-w-full mx-auto px-6 pt-16 pb-24 overflow-hidden mb-20"
          style={{
            background: "linear-gradient(90deg, #13356d 0%, #2e5fa7 100%)"
          }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-center">
            {/* Hero Content */}
            <motion.div variants={fadeInUp} className="relative z-10">
              <motion.div className="inline-flex items-center gap-2 py-2 text-sm text-white" variants={fadeIn}>
                <span className="text-secondary">●</span>
                Built for fast, fair access to finance
              </motion.div>

              {/* Tagline */}
              <AnimatedTitle
                as="h1"
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                highlightWords={["Loans Management", "Employee Payments"]}
                highlightClassName="text-secondary"
                delay={0.1}
                staggerDelay={0.1}
              >
                One Stop Platform for Loans Management & Employee Payments
              </AnimatedTitle>

              <motion.p className="mt-4 text-lg text-white leading-relaxed max-w-xl" variants={fadeIn}>
                Empower your business with seamless salary payments,
                instant loans, and grants all with
                easy repayment channels to help your company and employees operate smoothly.
              </motion.p>

              <motion.div className="mt-10 flex flex-col sm:flex-row gap-3" variants={fadeIn}>
                <motion.a
                  href="/auth-login"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-[250px] inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-dark font-bold transition-all"
                >
                  Sign in
                  <FaArrowRight className="ml-2" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Hero Image Aside */}
            <motion.div variants={fadeInUp} className="relative flex justify-center items-center">
              <img
                src={GalaxyS21Ultra}
                alt="Galaxy S21 Ultra"
                className="w-full max-w-[220px] sm:max-w-[320px] md:max-w-[380px] rounded-3xl shadow-2xl rotate-6 transition-transform duration-300 ease-in-out hover:scale-110"
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </div>
        </motion.div >

        {/* Services + QR */}
        <div className="max-w-7xl mx-auto px-6 rounded-3xl p-6 lg:p-8" >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-4xl md:text-3xl lg:text-5xl font-extrabold text-dark">
                What you can do
              </h2>
              <p className="text-lg text-dark/60 mt-1">
                Core services available in the application.
              </p>
            </div>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div className="bg-gradient-to-b from-brand via-brandLight to-primary rounded-2xl border border-brand/20 p-5 py-8 shadow-2xl" variants={scaleIn}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <GiReceiveMoney className="text-white text-xl" />
                </div>
                <div>
                  <div className="font-bold text-white">Loans</div>
                  <div className="text-xs text-white/80">
                    Apply, track, view details
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-b from-brand via-brandLight to-primary rounded-2xl border border-brand/20 p-5 py-8 shadow-2xl" variants={scaleIn}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <FaGift className="text-white text-lg" />
                </div>
                <div>
                  <div className="font-bold text-white">Grants</div>
                  <div className="text-xs text-white/80">
                    Apply and manage applications
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-b from-brand via-brandLight to-primary rounded-2xl border border-brand/20 p-5 py-8 shadow-2xl" variants={scaleIn}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <FaCreditCard className="text-white text-lg" />
                </div>
                <div>
                  <div className="font-bold text-white">Payments</div>
                  <div className="text-xs text-white/80">
                    Pay installments and view history
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-b from-brand via-brandLight to-primary rounded-2xl border border-brand/20 p-5 py-8 shadow-2xl" variants={scaleIn}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-3 border border-white/40">
                  <FaBell className="text-white text-lg" />
                </div>
                <div>
                  <div className="font-bold text-white">Notifications</div>
                  <div className="text-xs text-white/80">
                    Guarantor requests and updates
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative z-10 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-white shadow-xl rounded-2xl p-5">
              <div className="text-2xl font-bold text-dark">Open on your phone</div>
              <p className="text-lg text-dark/60 mt-1 mb-5">
                Scan the QR code to continue on mobile.
              </p>

              <motion.a
                href="/auth-login"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="w-[250px] inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-brand hover:bg-brand/50 text-white font-bold transition-all z-10"
              >
                Sign in
                <FaArrowRight className="ml-2" />
              </motion.a>
            </div>

            <div className="flex justify-end">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-10 relative">
                <QRCodeGenerator url={origin} size={160} className="mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Platforms Section */}
        <motion.div
          className="max-w-7xl mx-auto px-6 mt-20 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <motion.div className="inline-flex items-center gap-2 bg-white relative border border-white/60 rounded-full px-4 py-2 text-sm text-dark/70 shadow-xl mb-4 z-10" variants={fadeIn}>
              <span className="text-brand">●</span>
              Accessible on all your devices
            </motion.div>

            <h2 className="text-4xl md:text-3xl lg:text-5xl font-extrabold text-dark leading-tight">
              Access Your Account Anywhere
            </h2>
            <p className="mt-3 text-dark/70 max-w-2xl mx-auto">
              Our platform is optimized for all your devices. Sign in seamlessly on mobile, tablet, or desktop.
            </p>
          </motion.div>


          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <motion.div className="flex flex-col items-center" variants={scaleIn}>
              <img src={IPhone13ProMax} alt="Mobile" className="h-72 w-auto object-contain drop-shadow-2xl" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg text-dark mb-2">Mobile</h3>
                <p className="text-sm text-dark/60">Optimized for iPhone & Android</p>
              </div>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={scaleIn}>
              <img src={IPadMini} alt="Tablet" className="h-72 w-auto object-contain drop-shadow-2xl" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg text-dark mb-2">Tablet</h3>
                <p className="text-sm text-dark/60">Perfect for iPad & Android tablets</p>
              </div>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={scaleIn}>
              <img src={MacbookAir} alt="Desktop" className="h-72 w-auto object-contain drop-shadow-2xl" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-lg text-dark mb-2">Desktop</h3>
                <p className="text-sm text-dark/60">Full experience on laptop & desktop</p>
              </div>
            </motion.div>
          </div>

          <motion.div className="text-center mt-12" variants={fadeIn}>
            <p className="text-dark/60 text-sm">
              Only members registered with JSTL Foundation are allowed to access this platform.
            </p>
          </motion.div>
        </motion.div>

        {/* Organization Account Request Section */}
        <motion.div className="relative mt-10 z-10 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 py-16 lg:p-12 lg:py-20" >
          <h2 className="text-4xl md:text-3xl lg:text-5xl font-extrabold text-dark mb-2">Request an Account</h2>
          <p className="text-larg text-dark/60 mb-6">Enable your organization to make secure, bulk payments to employees and manage staff benefits with JSTL. Fill in your details and our team will reach out to help you get started.</p>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" autoComplete="off">
            <FadeInAnime delay={0.1} className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-dark mb-1">Organization Name</label>
              <input type="text" name="orgName" className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. Acme Ltd" required />
            </FadeInAnime>

            <FadeInAnime delay={0.2}>
              <label className="block text-sm font-medium text-dark mb-1">Contact Person</label>
              <input type="text" name="contactPerson" className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="Full Name" required />
            </FadeInAnime>

            <FadeInAnime delay={0.3}>
              <label className="block text-sm font-medium text-dark mb-1">Email Address</label>
              <input type="email" name="email" className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="you@company.com" required />
            </FadeInAnime>

            <FadeInAnime delay={0.4}>
              <label className="block text-sm font-medium text-dark mb-1">Phone Number</label>
              <input type="tel" name="phone" className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. +254700000000" required />
            </FadeInAnime>

            <FadeInAnime delay={0.5}>
              <label className="block text-sm font-medium text-dark mb-1">Number of Employees</label>
              <input type="number" name="employees" min="1" className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="e.g. 25" required />
            </FadeInAnime>

            <FadeInAnime delay={0.6} className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-dark mb-1">Additional Notes (optional)</label>
              <textarea name="notes" rows={2} className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-brand focus:ring-1 focus:ring-brand outline-none" placeholder="How can we help your organization?" />
            </FadeInAnime>

            <FadeInAnime delay={0.7} className="col-span-1 sm:col-span-2 mt-2 w-full md:w-1/4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-brand to-primary text-white font-bold shadow-lg shadow-primary/25 transition-all hover:from-primary hover:to-brand"
              >
                Request Organization Account
              </motion.button>
            </FadeInAnime>
          </form>
        </motion.div>
      </div >

      {/* Footer */}
      <footer className="w-full bg-brand text-white py-10 pt-16 relative z-10" >
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          <img
            src={CompanyLogo}
            alt="JSTL Logo"
            className="h-16 w-auto object-contain mb-4 bg-white/10 rounded-lg p-2"
          />
          <span className="font-bold text-2xl mb-2">JSTL</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/90 mb-2">
            <motion.a
              href="#"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="hover:underline"
            >
              Privacy Policy
            </motion.a>
            <span className="hidden sm:inline">|</span>
            <motion.a
              href="#"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="hover:underline"
            >
              Terms & Conditions
            </motion.a>
            <span className="hidden sm:inline">|</span>
            <motion.a
              href="#"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="hover:underline"
            >
              Contact
            </motion.a>
          </div>
          <div className="text-xs text-white/70 mb-1">© 2025 JSTL Limited. All rights reserved.</div>
          <div className="text-xs text-white/70">JSTL Finace Foundation Empowering Communities Through Fair Finace For Smaller Businesses.</div>
        </div>
      </footer>
    </>
  );
};

export default LandingScreen;
