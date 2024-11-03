import pymupdf
import sys
import utils.file_handler as file_handler
import utils.utils as utils

def intercalate_pdf(input_file, order, output_file):
    my_file_handler = file_handler.fileManager("./output")
    enclosing_folder =  my_file_handler.generate_folder(to_deliver=True)

    if not utils.validate_pdf(input_file):
        print("file input does not exist")
        raise Exception("file input does not exist")

    original_document = pymupdf.open(input_file)
    aux_document = pymupdf.open()


    for page in order:
        aux_document.insert_pdf(original_document, from_page = page, to_page = page)

    aux_document.save(f"./deliver/{enclosing_folder}/{output_file}")
    return f"./deliver/{enclosing_folder}/{output_file}"

