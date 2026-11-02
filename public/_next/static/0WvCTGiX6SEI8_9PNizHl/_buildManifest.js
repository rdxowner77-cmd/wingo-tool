self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/__/auth/:path*"
      },
      {
        "source": "/wingo-30s-live-prediction",
        "destination": "/?t=wingo-30s"
      },
      {
        "source": "/wingo-30s-prediction",
        "destination": "/?t=wingo-30s"
      },
      {
        "source": "/wingo-1-min-live-prediction-tool",
        "destination": "/?t=wingo-1m"
      },
      {
        "source": "/wingo-1-minute-prediction",
        "destination": "/?t=wingo-1m"
      },
      {
        "source": "/wingo-pattern-radar",
        "destination": "/?t=pattern-radar"
      },
      {
        "source": "/wingo-calculator",
        "destination": "/?t=fund-management"
      },
      {
        "source": "/fund-management",
        "destination": "/?t=fund-management"
      },
      {
        "source": "/about",
        "destination": "/?t=about"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()