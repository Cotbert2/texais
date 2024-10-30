import pymupdf
from .utils import validate_pdf, complete_pdf_name_file, validate_pdf_pages
from .file_handler import fileManager
def splitPdf(file, delimiter, output):
    file = complete_pdf_name_file(file)
    if not validate_pdf(file):
        #throw exepction
        raise Exception("file input does not exist or is not a pdf file")


    original_document = pymupdf.open(file)

    if not validate_pdf_pages(original_document, delimiter):
        raise Exception("Page for split is not valid")

    # Split the document into two parts
    second_document = pymupdf.open()
    second_document.insert_pdf(original_document, from_page = delimiter)
    file_manager = fileManager('./output')
    folder_path = file_manager.generate_folder(to_deliver=False)
    second_document.save(f"./output/{folder_path}/{output[0]}")
    original_document.delete_pages(from_page = delimiter)
    original_document.save(f"./output/{folder_path}/{output[1]}")
    return f"./output/{folder_path}", folder_path
