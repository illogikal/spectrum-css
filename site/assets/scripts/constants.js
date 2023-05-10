exports.COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
exports.SCALE_FALLBACK = matchMedia('(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)').matches ? 'large' : 'medium';
exports.CONTEXT_FALLBACK = 'spectrum';
exports.DIR_FALLBACK = 'ltr';

exports.DEFAULT_COLOR = (
    window.localStorage
        ? localStorage.getItem('theme:color') || COLOR_FALLBACK
        : COLOR_FALLBACK
);
exports.DEFAULT_SCALE = (
    window.localStorage
        ? localStorage.getItem('theme:scale') || SCALE_FALLBACK
        : SCALE_FALLBACK
);
exports.DEFAULT_THEME = (
    window.localStorage
        ? localStorage.getItem('theme:context') || CONTEXT_FALLBACK
        : CONTEXT_FALLBACK
);
exports.DEFAULT_DIR = (
    window.localStorage
        ? localStorage.getItem('theme:dir') || DIR_FALLBACK
        : DIR_FALLBACK
);
