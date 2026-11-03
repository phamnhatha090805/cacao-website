"""Local preview server that mirrors GitHub Pages clean URLs (/san-pham -> san-pham.html).

Usage: python serve.py [port]   (default 5500)
"""
import http.server
import os
import sys


class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.exists(path + ".html"):
            self.path = self.path.split("?", 1)[0].split("#", 1)[0] + ".html"
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
    http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
