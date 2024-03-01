export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow mt-10 dark:bg-gray-900">
            <div className="w-full max-w-screen-xl p-6 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{' '}
                    <a href="#" className="text-gray-700 dark:hover:text-white dark:text-gray-300">
                        Premiere League Blackjack™
                    </a>
                    . All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="text-gray-700 dark:hover:text-white dark:text-gray-300 me-4 md:me-6">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-700 dark:hover:text-white dark:text-gray-300 me-4 md:me-6">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-700 dark:hover:text-white dark:text-gray-300 me-4 md:me-6">
                            Licensing
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-700 dark:hover:text-white dark:text-gray-300">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
