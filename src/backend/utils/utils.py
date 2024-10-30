import sys
import pymupdf
import os


#Constants

Version = "Version 1.0.0"

#Utils
def validatePdf(url):
    if os.path.isfile(url) and pymupdf.open(url).is_pdf:
        return True
    return False

def complete_pdf_name_file(filename) -> str:
    return filename if filename.endswith('.pdf') else filename + '.pdf'


def validate_pdf_pages(file, page_slicer) -> bool:
    if page_slicer >= file.page_count or page_slicer <=0:
        return False
    return True



