import sys

from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWidgets import QApplication, QLineEdit, QMainWindow, QToolBar


class Browser(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("OPN Browser")

        self.view = QWebEngineView()
        self.view.setUrl(QUrl("https://www.example.com"))
        self.setCentralWidget(self.view)

        toolbar = QToolBar()
        self.addToolBar(toolbar)

        self.address_bar = QLineEdit()
        self.address_bar.returnPressed.connect(self.load_url)
        toolbar.addWidget(self.address_bar)

    def load_url(self):
        url = QUrl(self.address_bar.text())
        if url.scheme() == "":
            url.setScheme("http")
        self.view.setUrl(url)


def main():
    app = QApplication(sys.argv)
    browser = Browser()
    browser.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
