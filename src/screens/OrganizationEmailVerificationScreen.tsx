import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { organizationAccountService } from '@/services/organizationAccountService';
import { CompanyLogo } from '@/constants/ImageConstants';

const OrganizationEmailVerificationScreen = () => {
    const { token } = useParams<{ token: string }>();
    const [verifying, setVerifying] = useState(true);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        data?: any;
    } | null>(null);

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setResult({
                    success: false,
                    message: 'Invalid verification link. Please check your email for the correct verification link.'
                });
                setVerifying(false);
                return;
            }

            try {
                const response = await organizationAccountService.verifyEmail(token);
                setResult(response);
            } catch (error: any) {
                setResult({
                    success: false,
                    message: 'An unexpected error occurred. Please try again later.'
                });
            } finally {
                setVerifying(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        src={CompanyLogo}
                        alt="JSTL Logo"
                        className="h-16 w-auto object-contain"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Email Verification
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
                    {verifying ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Verifying your email address...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            {result?.success ? (
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Email Verified Successfully!</h3>
                                    <p className="text-sm text-gray-600 mb-6">{result.message}</p>

                                    {result.data && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <p className="text-sm text-gray-700">
                                                <strong>Organization:</strong> {result.data.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Verified on: {new Date(result.data.verified_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <a
                                            href={`${import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:3001/auth-login'}`}
                                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                        >
                                            Access Organization Dashboard
                                        </a>

                                        <Link
                                            to="/"
                                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                        >
                                            Back to Homepage
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Failed</h3>
                                    <p className="text-sm text-gray-600 mb-6">{result?.message || 'Unable to verify your email address.'}</p>

                                    <div className="space-y-3">
                                        <Link
                                            to="/"
                                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                        >
                                            Request New Account
                                        </Link>

                                        <Link
                                            to="/"
                                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                        >
                                            Back to Homepage
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} JSTL Foundation. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationEmailVerificationScreen;