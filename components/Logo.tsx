import React from 'react';

// This base64 string represents a custom SVG logo.
// It was designed to be warm and friendly, reflecting the organization's mission.
const logoBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuYnJhbmQtdGV4dCB7IGZvbnQ6IGJvbGQgMjRweCAnUG9wcGlucycsIHNhbnMtc2VyaWY7IGZpbGw6ICMzMzQxNTU7IH0KICAgICAgLmxvZ28tc2hhcGUgeyBmaWxsOiAjZjk3MzE2OyB9CiAgICAgIC5wYXctcGFkIHsgZmlsbDogI2ZmZmZmZjsgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImxvZ28tc2hhcGUiIGQ9Ik0yNSw1QzEyLjgsNSwyLjUsMTQuNiwyLjUsMjZjMCwxMS40LDE0LDI0LDE5LDI1LjJjMS4yLDAuMywyLjUsMC4zLDMuNywwYzUtMS4yLDE5LTEzLjgsMTktMjUuMkM0NC4yLDE0LjYsMzcuMiw1LDI1LDV6Ii8+CiAgPGNpcmNsZSBjbGFzcz0icGF3LXBhZCIgY3g9IjI1IiBjeT0iMzIiIHI9IjUiLz4KICA8Y2lyY2xlIGNsYXNzPSJwYXctcGFkIiBjeD0iMTciIGN5PSIyMyIgcj0iMyIvPgogIDxjaXJjbGUgY2xhc3M9InBhdy1wYWQiIGN4PSIyNSIgY3k9IjIwIiByPSIzIi8+CiAgPGNpcmNsZSBjbGFzcz0icGF3LXBhZCIgY3g9IjMzIiBjeT0iMjMiIHI9IjMiLz4KICA8dGV4dCB4PSI1NSIgeT0iMzIiIGNsYXNzPSJicmFuZC10ZXh0Ij5LVVRUQUFXQUFMQTwvdGV4dD4KPC9zdmc+";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img src={logoBase64} alt="KUTTAWAALA Logo" className={className} />
    );
};

export default Logo;
