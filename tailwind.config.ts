import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
    // darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'rainbow': "url('/rrrainbow.svg')",
                'abstract': "url('/aaabstract.png')",
                'abstract2': "url('/aaabstract2.jpeg')",
                'noise': "url('/nnnoise.svg')",
                
            },
            animation: {
                enter: 'enter 0.2s ease-out forwards',
                leave: 'leave 0.2s ease-in forwards',
            },
            keyframes: {
                enter: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                leave: {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '100%': { opacity: '0', transform: 'scale(0.9)' },
                },
            },
            transitionProperty: {
                width: 'width',
                spacing: 'margin, padding',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('autoprefixer')],
};
export default config;
