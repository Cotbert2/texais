import pymupdf
import sys
import utils.file_handler as file_handler
import utils.utils as utils

def deprotect_pdf(filename, passwd, output_path):
    my_file_handler = file_handler.fileManager("./output")
    enclosing_folder =  my_file_handler.generate_folder(to_deliver=True)

    if not utils.validate_pdf(filename):
        print("file input does not exist")
        raise Exception("file input does not exist")


    original_document = pymupdf.open(filename=filename)

    if not original_document.needs_pass:
        print("The document is not password protected")
        raise Exception("The document is not password protected")

    auth = original_document.authenticate(password=passwd)
    if auth not in (1 , 4 , 6):
        print("The password is incorrect")
        raise Exception("The password is incorrect")

    original_document.save(filename=f"./deliver/{enclosing_folder}/{output_path}",owner_pw=passwd, user_pw=passwd, encryption=pymupdf.PDF_ENCRYPT_NONE)

    return f"./deliver/{enclosing_folder}/{output_path}"
