export const WavyBackground = ({ className = "" }: { className?: string }) => (
    <svg 
        className={className}
        width="100%" 
        height="100%" 
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern id="wavy" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
                <path 
                    d="M 0,50 Q 25,0 50,50 T 100,50" 
                    stroke="#22d3ee" 
                    strokeWidth="2" 
                    fill="none"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavy)" />
    </svg>
);