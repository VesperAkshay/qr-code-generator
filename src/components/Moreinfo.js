import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function Moreinfo() {
    return (
        <div className="flex justify-center items-center min-h-screen p-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
            <motion.div
                className="text-center p-8 bg-white dark:bg-indigo-950 bg-opacity-90 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Back to Home Icon */}
                <motion.div
                    className="mx-auto text-gray-800 dark:text-gray-200 text-4xl mb-4"
                    initial={{ rotate: -45 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <Link to="/" className="inline-flex items-center text-lg text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-200"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                    More About QR Codes
                </motion.h1>

                {/* Description Section */}
                <motion.p
                    className="text-lg mb-8 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    QR Codes (Quick Response Codes) are a type of matrix barcode that can
                    store a variety of information such as URLs, contact details, and
                    payment info. With smartphones, QR codes have become a popular method
                    for connecting users to digital content seamlessly.
                </motion.p>

                {/* More Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                            History of QR Codes
                        </h2>
                        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                            QR codes were first invented in 1994 by Denso Wave, a subsidiary
                            of Toyota, to track vehicles and parts in manufacturing. Since
                            then, they have been widely adopted for marketing and consumer
                            interaction.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                            How QR Codes Work
                        </h2>
                        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                            QR codes work by storing data in a square grid format. When a
                            smartphone scans the code, it decodes the pattern and directs the
                            user to the embedded information.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                            Benefits of Using QR Codes
                        </h2>
                        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                            QR codes provide a fast, convenient way to access information. They
                            are used in mobile payments, event ticketing, restaurant menus, and
                            more.
                        </p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                            The Future of QR Codes
                        </h2>
                        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                            With the rise of mobile technology, QR codes will continue to play
                            a significant role in bridging the gap between the physical and
                            digital worlds.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}