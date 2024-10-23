import pymupdf
import sys

def main(input_file, order, output_file):

    original_document = pymupdf.open(input_file)
    aux_document = pymupdf.open()


    for page in order:
        aux_document.insert_pdf(original_document, from_page = page)

    aux_document.save(f"./output/${output_file}")



if __name__ == "__main__":
    main()