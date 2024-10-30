import pymupdf
import sys
import utils.file_handler as file_handler
import utils.utils as utils

def protect_pdf(filename, passwd, output_path):
    my_file_handler = file_handler.fileManager("./output")
    enclosing_folder =  my_file_handler.generate_folder(to_deliver=True)

    if not utils.validate_pdf(filename):
        print("file input does not exist")
        raise Exception("file input does not exist")

    original_document = pymupdf.open(filename=filename)
    original_document.save(filename=f"./deliver/{enclosing_folder}/{output_path}",owner_pw=passwd, user_pw=passwd, encryption=pymupdf.PDF_ENCRYPT_AES_256)

    return f"./deliver/{enclosing_folder}/{output_path}"
