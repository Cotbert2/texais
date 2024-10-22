import sys
import pymupdf
import os


#Constants

Version = "Version 1.0.0"

#Utils
def validatePathPdf(url):
    if os.path.isfile(url) and pymupdf.open(url).is_pdf:
        return True
    return False

