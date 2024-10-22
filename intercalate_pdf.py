import pymupdf
import sys

def main():

    original_document = pymupdf.open("./test-files/test.pdf")
    aux_document = pymupdf.open()

    order = [2,0,1]

    for page in order:
        aux_document.insert_pdf(original_document, from_page = page)

    aux_document.save("./output/intercalate.pdf")



if __name__ == "__main__":
    main()