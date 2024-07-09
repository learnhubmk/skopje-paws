import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./**/*.tsx",
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            'cream': '#FFE8DF',
            'orange': '#FFAC66',
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'black': '#000'
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        },
        height: {
            customHeight: '37.5rem'
        }
    },
    plugins: [],
};
export default config;
