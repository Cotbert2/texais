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


def complete_file_path(file)  -> str:
    file_len = len(file)
    if (file[file_len - 4: file_len] != ".pdf"):
        file += ".pdf"
    return file

