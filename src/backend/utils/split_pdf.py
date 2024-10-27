import pymupdf
from .utils import validatePathPdf, complete_file_path

def splitPdf(file, delimiter, output):
    file = complete_file_path(file)
    #if not validatePathPdf(file):
    #    print("file input does not exist")

    original_document = pymupdf.open(file)

    #if delimiter >= original_document.page_count:
    #    print("The page deadline is overflow the page number of the document")
    #    delimiter.exit(0)

    # Split the document into two parts
    second_document = pymupdf.open()
    second_document.insert_pdf(original_document, from_page = delimiter)
    second_document.save(f"./output/{output[0]}")
    original_document.delete_pages(from_page = delimiter)
    original_document.save(f"./output/{output[1]}")

    return output
