# OPN Browser

This project aims to build a minimal web browser using AI-generated code.

## Getting Started

1. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the browser:
   ```bash
   python -m opn_browser.main
   ```

The browser uses PyQt5 and QtWebEngine to render web pages. When started, it loads
`https://www.example.com` and provides an address bar where you can enter URLs.
