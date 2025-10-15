import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import OpenLayout from "@/layouts/OpenLayout";
import useScreenSize from "./hooks/useScreenSize";
import {
  AuthRedirect,
  GuestRedirect,
  InstallPrompt,
  OfflineIndicator,
} from "./components";
import {
  Home,
  Login,
  Loans,
  Grants,
  Profile,
  Payments,
  NotFound,
  Dependent,
  VerifyOtp,
  ApplyLoan,
  ApplyGrant,
  LoansGrants,
  EditProfile,
  LoanDetails,
  GrantDetails,
  RegisterUser,
  Notifications,
  DeleteAccount,
  PasswordReset,
  ChangePassword,
  CreateDependant,
  ValidateProfile,
  ChangePasswordExternal,
} from "./screens";

function App() {
  const { isMobile } = useScreenSize();

  return (
    <>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<OpenLayout />}>
          <Route path="/" element={<AuthRedirect element={<Home />} />} />
          <Route path="/loans" element={<AuthRedirect element={<Loans />} />} />
          <Route
            path="/grants"
            element={<AuthRedirect element={<Grants />} />}
          />
          <Route
            path="/grants/:id"
            element={<AuthRedirect element={<GrantDetails />} />}
          />
          <Route
            path="/create-dependant"
            element={<AuthRedirect element={<CreateDependant />} />}
          />
          <Route
            path="/dependent"
            element={<AuthRedirect element={<Dependent />} />}
          />
          <Route
            path="/loans-and-grants"
            element={<AuthRedirect element={<LoansGrants />} />}
          />
          <Route
            path="/profile"
            element={<AuthRedirect element={<Profile />} />}
          />
          <Route
            path="/apply-grant"
            element={<AuthRedirect element={<ApplyGrant />} />}
          />
          <Route
            path="/apply-loan"
            element={<AuthRedirect element={<ApplyLoan />} />}
          />
          <Route
            path="/edit-profile"
            element={<AuthRedirect element={<EditProfile />} />}
          />
          <Route
            path="/loan-details/:id"
            element={<AuthRedirect element={<LoanDetails />} />}
          />
          <Route
            path="/payments"
            element={<AuthRedirect element={<Payments />} />}
          />
          <Route
            path="/notifications"
            element={<AuthRedirect element={<Notifications />} />}
          />
          <Route
            path="/delete-account"
            element={<AuthRedirect element={<DeleteAccount />} />}
          />
          <Route
            path="/update-password"
            element={<AuthRedirect element={<ChangePassword />} />}
          />
        </Route>

        {/* Open Routes */}
        <Route
          path="/404-notfound"
          element={<GuestRedirect element={<NotFound />} />}
        />
        <Route
          path="/auth-register"
          element={<GuestRedirect element={<RegisterUser />} />}
        />
        <Route
          path="/auth-login"
          element={<GuestRedirect element={<Login />} />}
        />
        <Route
          path="/auth-password-reset"
          element={<GuestRedirect element={<PasswordReset />} />}
        />
        <Route
          path="/auth-validate-profile"
          element={<GuestRedirect element={<ValidateProfile />} />}
        />
        <Route
          path="/verify-otp"
          element={<GuestRedirect element={<VerifyOtp />} />}
        />
        <Route
          path="/change-password"
          element={<GuestRedirect element={<ChangePasswordExternal />} />}
        />

        {/* Catch-all route for 404 - This must be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* PWA Components */}
      <InstallPrompt />
      <OfflineIndicator />

      {/* Sonner Toast notification */}
      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        className="my-toast"
        toastOptions={{
          classNames: {
            toast: "bg-background text-foreground border-border",
            title: "font-semibold",
            description: "text-sm",
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
            info: "bg-primary text-white",
          },
        }}
      />
    </>
  );
}

export default App;
